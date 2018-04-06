using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using MovieTime.Web.Comments;
using MovieTime.Web.Users.Models;
using Serilog;

namespace MovieTime.Web.Users
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly ICommentRepository _commentRepository;
        private readonly IMapper _mapper;
        
        public UserService(IUserRepository userRepository, ICommentRepository commentRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _commentRepository = commentRepository;
            _mapper = mapper;
        }
        
        public async Task<ICollection<UserGetDto>> GetAllUsers()
        {
            ICollection<User> user = await _userRepository.GetAll();
            var userDto = _mapper.Map<ICollection<User>, List<UserGetDto>>(user);
            return userDto;
        }

        public async Task<User> GetUser(string id)
        {
            var user = await _userRepository.Find(x => x.Id == id);
            return user;
        }

        public async Task<bool> UpdateUser(User user)
        {
            var storedUser = await _userRepository.Update(user, user.Id);

            return storedUser != null;
        }

        public async Task<bool> AddUser(User user)
        {
            var userIsCreated = await _userRepository.Add(user);
            return userIsCreated;
        }

        public async Task<bool> UserExist(string id)
        {
            var countMatches = await _userRepository.CountMatch(x => x.Id == id);
            return countMatches > 0;
        }

        public async Task<int> RemoveUser(string id)
        {
            var unlinkedSuccess = await UnlinkComment(id);
            if (!unlinkedSuccess) Log.Information("failed to unlink comment from user.");
            var user = await _userRepository.Find(x => x.Id == id);
            var result = await _userRepository.Delete(user);

            return result;
        }
        
        private async Task<bool> UnlinkComment(string id)
        {
            var comments = await _commentRepository.FindAll(x => x.UserId == id);
            foreach (var comment in comments)
            {
                comment.User = null;
                comment.UserId = null;
                await _commentRepository.Update(comment, comment.CommentId);
            }

            return true;
        }
    }
}
