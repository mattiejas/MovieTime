param(
    $rgname,
    $vmname
)
az vm stop --resource-group $rgname --name $vmname