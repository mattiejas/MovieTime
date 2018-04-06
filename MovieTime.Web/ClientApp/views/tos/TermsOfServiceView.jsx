import React from 'react';

import styles from './TermsOfServiceView.scss';

const TermsOfServiceView = () => (
  <div className={styles.termsofservice}>
    <h1>Privacy policy</h1>

    <h4 id="datawhichwillbesavedbythemovietimeservice">Data which will be saved by the MovieTime service</h4>

    <ul>
      <li>My name and e-mail address.</li>
      <li>My interactions. These interactions are limited to:</li>
      <ul>
        <li> the movies I track;</li>
        <li> the movies I have marked as "watched";</li>
        <li> and the comments I have placed.</li>
      </ul>
    </ul>

    <h4 id="whocanviewmydata">Who can view my data?</h4>

    <ul>
      <li>Other registered users. E-mail addresses are not visible to other users. </li>

      <li>Site administrators.</li>
    </ul>

    <h4 id="whichthirdpartyserviceshaveaccesstomydata">Which third-party services have access to my data?</h4>

    <ul>
      <li>Firebase, an authentication service provider, can view your email and hashed password (i.e. encoded password). </li>
    </ul>

    <h4 id="whatrightsdoihavewithregardstomydata">What rights do I have with regards to my data?</h4>
    <ul>
      <li>Firebase, an authentication service provider, can view your email and hashed password (i.e. encoded password). </li>
    </ul>

    <h4 id="whatwillmydatabeusedfor">What will my data be used for?</h4>

    <ul>
      <li>Your email address and password will only be used to authenticate you when you sign in.</li>

      <li>
				Data resulting from your interactions on the service will not be used for alternative purposes than the immediate purpose for which
				these were persisted in our database.
      </li>

      <li>
				All data will only be saved for the period that it is needed and not longer than that. To clarify with an example: if you remove a
				movie from your "watched-movies" list, the service will have no record of the movie ever being added or deleted.
      </li>

      <li>
				The service logs errors which might contain user data to a dedicated Slack channel. This is only used to track down errors and these
				logs are deleted on a regular basis.
      </li>
    </ul>
  </div>
);

export default TermsOfServiceView;
