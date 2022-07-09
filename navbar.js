function GetNavBar() {
    $.ajax({
        url: 'http://localhost:3000/Session/1',
        method: "GET",
        dataType: "JSON",
        success: function (data) {
            $('#get-session').empty()
            $('#get-session').val(data.userid)
            if (data.userid != 0) {
                $.ajax({
                    url: 'http://localhost:3000/Users',
                    method: "GET",
                    dataType: "JSON",
                    success: function (dataa) {
                        $.each(dataa, function (i, v) {
                            if (data.userid == v.id && v.Role == "admin") {
                                $('#get-nav').empty()
                                $('#get-nav').append(
                                    '<a class="nav-item nav-link" href="index.html">Home</a>'
                                    + '<a class="nav-item nav-link" href="guitar.html">Guitar</a>'
                                    + '<a class="nav-item nav-link" href="#">Electric guitar</a>'
                                    + '<a class="nav-item nav-link" href="#">Accessory</a>'
                                    + '<li class="nav-item dropdown no-arrow">'
                                    + '<a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"'
                                    + 'data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
                                    + 'Hi,' + v.Name + '<span class="mr-2 d-none d-lg-inline text-gray-600 small"></span>'
                                    + '</a>'
                                    + '<div class="dropdown-menu dropdown-menu-right shadow animated--grow-in"'
                                    + 'aria-labelledby="userDropdown">'
                                    + '<div class="d-flex">'
                                    + '<i class="fas fa-wallet ml-3 mt-2"></i>'
                                    + '<a class="dropdown-item" href="pay.html">' + ConvertCurreny(v.Wallet, 1) + '</a>'
                                    + '</div>'
                                    + '<div class="d-flex">'
                                    + '<i class="fas fa-users ml-3 mt-2"></i>'
                                    + '<a class="dropdown-item ml-my-1" href="profile.html" onclick="users.GetProfile()">'
                                    + 'Profile'
                                    + '</a>'
                                    + '</div>'
                                    + '<div class="d-flex">'
                                    + '<i class="fas fa-tachometer-alt ml-3 mt-2"></i>'
                                    + '<a class="dropdown-item ml-my-1" href="Dashboad/template/index.html">'
                                    + 'Dasboard'
                                    + '</a>'
                                    + '</div>'
                                    + '<div class="dropdown-divider"></div>'
                                    + '<div class="d-flex">'
                                    + '<i class="fas fa-sign-out-alt  ml-3 mt-2"></i>'
                                    + '<a class="dropdown-item" href="#" onclick="sessions.logout()" data-toggle="modal"'
                                    + 'data-target="#logoutModal">'
                                    + 'Logout'
                                    + '</a>'
                                    + '</div>'
                                    + '</div>'
                                    + '</li>'
                                )
                            }
                            else if (data.userid == v.id && v.Role == "user") {
                                $('#get-nav').empty()
                                $('#get-nav').append(
                                    '<a class="nav-item nav-link" href="index.html">Home</a>'
                                    + '<a class="nav-item nav-link" href="guitar.html">Guitar</a>'
                                    + '<a class="nav-item nav-link" href="#">Electric guitar</a>'
                                    + '<a class="nav-item nav-link" href="#">Accessory</a>'
                                    + '<li class="nav-item dropdown no-arrow">'
                                    + '<a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"'
                                    + 'data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
                                    + 'Hi,' + v.Name + '<span class="mr-2 d-none d-lg-inline text-gray-600 small"></span>'
                                    + '</a>'
                                    + '<div class="dropdown-menu dropdown-menu-right shadow animated--grow-in"'
                                    + 'aria-labelledby="userDropdown">'
                                    + '<div class="d-flex">'
                                    + '<i class="fas fa-wallet ml-3 mt-2"></i>'
                                    + '<a class="dropdown-item" href="pay.html">' + ConvertCurreny(v.Wallet, 1) + '</a>'
                                    + '</div>'
                                    + '<div class="d-flex">'
                                    + '<i class="fas fa-users ml-3 mt-2"></i>'
                                    + '<a class="dropdown-item ml-my-1" href="profile.html" onclick="users.GetProfile()">'
                                    + 'Profile'
                                    + '</a>'
                                    + '</div>'
                                    + '<div class="dropdown-divider"></div>'
                                    + '<div class="d-flex">'
                                    + '<i class="fas fa-sign-out-alt  ml-3 mt-2"></i>'
                                    + '<a class="dropdown-item" href="#" onclick="sessions.logout()" data-toggle="modal"'
                                    + 'data-target="#logoutModal">'
                                    + 'Logout'
                                    + '</a>'
                                    + '</div>'
                                    + '</div>'
                                    + '</li>'
                                )
                            }
                        });
                    }
                })
            }
            else {
                $('#get-nav').empty()
                $('#get-nav').append(
                    '<a class="nav-item nav-link" href="index.html">Home</a>'
                    + '<a class="nav-item nav-link" href="guitar.html">Guitar</a>'
                    + '<a class="nav-item nav-link" href="#">Electric guitar</a>'
                    + '<a class="nav-item nav-link" href="#">Accessory</a>'
                    + '<a href="Login/index.html" class="nav-item nav-link last">Sign In</a>'
                )
            }
        }
    })
}
GetNavBar()