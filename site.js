let guitars = {} || guitars;
let brands = {} || brands;
let users = {} || users;
let sessions = {} || sessions;
let carts = {} || carts;
let arrGuitars = [];

guitars.getArr = function () {
    $.ajax({
        url: 'http://localhost:3000/Guitars',
        method: "GET",
        dataType: "JSON",
        success: function (data) {
            $('#guitar-display').empty()
            $('#row-hot-collection').empty()
            $.each(data, function (i, v) {
                guitars.homedisplay(v)
                guitars.guitarsDisplay(v)
            })
        }
    })
}
guitars.getArray = function () {
    $.ajax({
        url: 'http://localhost:3000/Guitars',
        method: "GET",
        dataType: "JSON",
        success: function (data) {
            $.each(data, function (i, v) {
                arrGuitars.push(v)
            })
        }
    })
}
function ConvertCurreny(money, value) {
    let x = +money * +value;
    return x = x.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
}
guitars.homedisplay = function (v) {
    if (v.Price >= 3200000 && v.Price <= 5000000) {
        $('#row-hot-collection').append('<div class="col-sm-4">'
            + '<div class="best_shoes">'
            + '<p class="best_text">' + v.Name + '</p>'
            + '<div class="shoes_icon"><img src="' + v.Images[0] + '"></div>'
            + '<div class="star_text">'
            + '<div class="left_part">'
            + '<ul>'
            + '<li><a href="#"><img src="images/star-icon.png"></a></li>'
            + '<li><a href="#"><img src="images/star-icon.png"></a></li>'
            + '<li><a href="#"><img src="images/star-icon.png"></a></li>'
            + '<li><a href="#"><img src="images/star-icon.png"></a></li>'
            + '<li><a href="#"><img src="images/star-icon.png"></a></li>'
            + '</ul>'
            + '</div>'
            + '<div class="right_part">'
            + '<div class="shoes_price">' + ConvertCurreny(v.Price, 1) + '</div>'
            + '</div>'
            + '</div>'
            + '<div class="btn-details">'
            + '<button type="button" class="btn btn-primary " data-toggle="modal" data-target="#exampleModal" onclick="guitars.homeDetails(' + v.id + ')">Details</button>'
            + '<button type="button" class="btn btn-danger" onclick="AddToCart(' + v.id + ')">Add To Carts</button>'
            + '</div>'
            + '</div>'
            + '</div>'
        )
    }
}

guitars.guitarsDisplay = function (v) {

    $('#guitar-display').append('<div class="col-sm-4">'
        + '<div class="best_shoes">'
        + '<p class="best_text">' + v.Name + '</p>'
        + '<div class="shoes_icon"><img src="' + v.Images[0] + '"></div>'
        + '<div class="star_text">'
        + '<div class="left_part">'
        + '<ul>'
        + '<li><a href="#"><img src="images/star-icon.png"></a></li>'
        + '<li><a href="#"><img src="images/star-icon.png"></a></li>'
        + '<li><a href="#"><img src="images/star-icon.png"></a></li>'
        + '<li><a href="#"><img src="images/star-icon.png"></a></li>'
        + '<li><a href="#"><img src="images/star-icon.png"></a></li>'
        + '</ul>'
        + '</div>'
        + '<div class="right_part">'
        + '<div class="shoes_price">' + ConvertCurreny(v.Price, 1) + '</div>'
        + '</div>'
        + '</div>'
        + '<div class="btn-details">'
        + '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#guitar-modal" onclick="guitars.guitarsDetails(' + v.id + ')">Details</button>'
        + '<button type="button" class="btn btn-danger" onclick="AddToCart(' + v.id + ')">Add To Carts</button>'
        + '</div>'
        + '</div>'
        + '</div>'
    )
}

guitars.homeDetails = function (id) {
    $.ajax({
        url: 'http://localhost:3000/Guitars/' + id,
        method: "GET",
        dataType: "JSON",
        success: function (data) {
            $('#modal-title-index').empty()
            $('#modal-img-1').empty()
            $('#modal-img-2').empty()
            $('#modal-img-3').empty()
            $('#modal-img-4').empty()
            $('#modal-information').empty()
            $('#modal-img-1').append(
                '<img class="d-block w-100"  src="' + data.Images[0] + '" alt="First slide" onclick="guitars.HomeImageOnModal(' + id + ',' + 0 + ')" data-toggle="modal" data-target="#ImageModal">'
            )
            $('#modal-img-2').append(
                '<img class="d-block w-100"  src="' + data.Images[1] + '" alt="Second slide" onclick="guitars.HomeImageOnModal(' + id + ',' + 1 + ')" data-toggle="modal" data-target="#ImageModal">'
            )
            $('#modal-img-3').append(
                '<img class="d-block w-100"  src="' + data.Images[2] + '" alt="Third slide" onclick="guitars.HomeImageOnModal(' + id + ',' + 2 + ')" data-toggle="modal" data-target="#ImageModal">'
            )
            $('#modal-img-4').append(
                '<img class="d-block w-100"  src="' + data.Images[3] + '" alt="Fourth slide" onclick="guitars.HomeImageOnModal(' + id + ',' + 3 + ')" data-toggle="modal" data-target="#ImageModal">'
            )
            $('#modal-title-index').append(
                '<h5 class="modal-title" id="exampleModalLabel">' + data.Name + '</h5>'

            )
            let x = +data.Price;
            x = x.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
            $('#modal-information').append(
                '<p><b>Name: </b>' + data.Name + '</p>'
                + '<p><b>Price: </b>' + x + '</p>'
                + '<p><b>Brand ID: </b>' + data.Brand.id + '</p>'
                + '<p><b>Brand Name: </b>' + data.Brand.Name + '</p>'
                + '<p><b>Origin: </b>' + data.Origin + '</p>'
                + '<p><b>Body Shape: </b>' + data.BodyShape + '</p>'
                + '<p><b>Truss Rod: </b>' + data.TrussRod + '</p>'
                + '<p><b>Top: </b>' + data.Top + '</p>'
                + '<p><b>Slide: </b>' + data.Slide + '</p>'
                + '<p><b>Back: </b>' + data.Back + '</p>'
                + '<p><b>Neck: </b>' + data.Neck + '</p>'
            )
            $('#modal-footer-home').empty()
            $('#modal-footer-home').append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>'
                + '<button type="button" class="btn btn-danger" onclick="AddToCart(' + data.id + ')">Add to Carts</button>')
        }
    })
}

guitars.guitarsDetails = function (id) {
    $.ajax({
        url: 'http://localhost:3000/Guitars/' + id,
        method: "GET",
        dataType: "JSON",
        success: function (data) {
            $('#modal-title-guitar').empty()
            $('#guitar-modal-img-1').empty()
            $('#guitar-modal-img-2').empty()
            $('#guitar-modal-img-3').empty()
            $('#guitar-modal-img-4').empty()
            $('#guitar-modal-information').empty()
            $('#guitar-modal-img-1').append(
                '<img class="d-block w-100"  src="' + data.Images[0] + '" alt="First slide" onclick="guitars.GuitarImageOnModal(' + id + ',' + 0 + ')" data-toggle="modal" data-target="#ImageModalGuitar">'
            )
            $('#guitar-modal-img-2').append(
                '<img class="d-block w-100"  src="' + data.Images[1] + '" alt="Second slide" onclick="guitars.GuitarImageOnModal(' + id + ',' + 1 + ')" data-toggle="modal" data-target="#ImageModalGuitar">'
            )
            $('#guitar-modal-img-3').append(
                '<img class="d-block w-100"  src="' + data.Images[2] + '" alt="Third slide" onclick="guitars.GuitarImageOnModal(' + id + ',' + 2 + ')" data-toggle="modal" data-target="#ImageModalGuitar">'
            )
            $('#guitar-modal-img-4').append(
                '<img class="d-block w-100"  src="' + data.Images[3] + '" alt="Fourth slide" onclick="guitars.GuitarImageOnModal(' + id + ',' + 3 + ')" data-toggle="modal" data-target="#ImageModalGuitar">'
            )
            $('#modal-title-guitar').append(
                '<h5 class="modal-title" id="exampleModalLabel">' + data.Name + '</h5>'

            )
            $('#guitar-modal-information').append(
                '<p><b>Name: </b>' + data.Name + '</p>'
                + '<p><b>Price: </b>' + ConvertCurreny(data.Price, 1) + '</p>'
                + '<p><b>Brand ID: </b>' + data.Brand.id + '</p>'
                + '<p><b>Brand Name: </b>' + data.Brand.Name + '</p>'
                + '<p><b>Origin: </b>' + data.Origin + '</p>'
                + '<p><b>Body Shape: </b>' + data.BodyShape + '</p>'
                + '<p><b>Truss Rod: </b>' + data.TrussRod + '</p>'
                + '<p><b>Top: </b>' + data.Top + '</p>'
                + '<p><b>Slide: </b>' + data.Slide + '</p>'
                + '<p><b>Back: </b>' + data.Back + '</p>'
                + '<p><b>Neck: </b>' + data.Neck + '</p>'
            )
            $('#modal-footer-guitar').empty()
            $('#modal-footer-guitar').append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>'
                + '<button type="button" class="btn btn-danger" onclick="AddToCart(' + data.id + ')">Add to Carts</button>')
        }
    })
}

guitars.HomeImageOnModal = function (i, v) {
    $.ajax({
        url: 'http://localhost:3000/Guitars/' + i,
        method: "GET",
        dataType: "JSON",
        success: function (data) {
            $('#images-on-modal').empty()
            $('#images-on-modal').append(
                '<img src="' + data.Images[v] + '" alt="">'
            )

        }
    })

}

guitars.GuitarImageOnModal = function (i, v) {
    $.ajax({
        url: 'http://localhost:3000/Guitars/' + i,
        method: "GET",
        dataType: "JSON",
        success: function (data) {
            $('#images-on-modal-guitar').empty()
            $('#images-on-modal-guitar').append(
                '<img src="' + data.Images[v] + '" alt="">'
            )
        }
    })

}

brands.GetBrand = function () {
    $.ajax({
        url: 'http://localhost:3000/Brands',
        method: "GET",
        dataType: "JSON",
        success: function (data) {
            $.each(data, function (i, v) {
                $('#get-brands').append(
                    '<option value="' + v.id + '">' + v.Name + '</option>'
                )
            })
        }
    })
}

guitars.GetProductByBrand = function () {
    let val = $('#get-brands').val()
    $('#guitar-display').empty()
    if (val != 0) {
        for (let index = 0; index < arrGuitars.length; index++) {
            if (arrGuitars[index].Brand.id == val) {
                guitars.guitarsDisplay(arrGuitars[index])
            }
        }
    }
    else guitars.getArr();
}
guitars.GetProductByPrice = function () {
    let val = $('#price').val()
    $('#guitar-display').empty()
    if (val == '1t3') {
        for (let index = 0; index < arrGuitars.length; index++) {
            if (arrGuitars[index].Price >= 1000000 && arrGuitars[index].Price <= 3000000) {
                guitars.guitarsDisplay(arrGuitars[index])
            }
        }
    }
    else if (val == '3t5') {
        for (let index = 0; index < arrGuitars.length; index++) {
            if (arrGuitars[index].Price >= 3000000 && arrGuitars[index].Price <= 5000000) {
                guitars.guitarsDisplay(arrGuitars[index])
            }
        }
    }
    else if (val == 'o5') {
        for (let index = 0; index < arrGuitars.length; index++) {
            if (arrGuitars[index].Price >= 5000000) {
                guitars.guitarsDisplay(arrGuitars[index])
            }
        }
    }
    else if (val == 'none') guitars.getArr();
}

guitars.SearchProductBySorted = function () {

    var value = $('#sorted').val()

    if (value == "low") {
        $('#guitar-display').empty()
        arrGuitars.sort(function (a, b) {
            if (parseInt(a.Price) < parseInt(b.Price)) { return -1; }
            if (parseInt(a.Price) > parseInt(b.Price)) { return 1; }
            return 0;
        })
        for (let index = 0; index < arrGuitars.length; index++) {
            guitars.guitarsDisplay(arrGuitars[index])
        }

    }
    else if (value == "high") {
        $('#guitar-display').empty()
        arrGuitars.sort(function (a, b) {
            if (parseInt(a.Price) > parseInt(b.Price)) { return -1; }
            if (parseInt(a.Price) < parseInt(b.Price)) { return 1; }
            return 0;
        })
        for (let index = 0; index < arrGuitars.length; index++) {
            guitars.guitarsDisplay(arrGuitars[index])
        }
    }
    else {
        $('#guitar-display').empty()
        guitars.getArr();
    }
}
guitars.GetProductByName = function () {
    var search = $('#form-search').val()
    console.log(search)
    $('#guitar-display').empty()

    if (search != null) {
        for (let index = 0; index < arrGuitars.length; index++) {
            if (arrGuitars[index].Name.toLowerCase().includes(search.toLowerCase())) {
                guitars.guitarsDisplay(arrGuitars[index])
            }
        }
    } else guitars.getArr();
}

users.login = function () {
    var check = false
    let username = $("#username").val();
    let password = $("#password").val();
    $.ajax({
        url: 'http://localhost:3000/Users',
        method: "GET",
        dataType: "JSON",
        success: function (data) {
            $.each(data, function (i, v) {
                if (v.Username == username && v.Password == password) {
                    check = true
                    sessions.session(v.id)
                }
            });
            if (check == false) {
                $('#alert').empty()
                $('#alert').append(
                    '<div class="alert alert-warning alert-dismissible fade show" role="alert">'
                    + 'Incorrect Username or Password'
                    + '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
                    + '<span aria-hidden="true">&times;</span>'
                    + '</button>'
                    + '</div>'
                )
            }
        }
    })
}
users.register = function () {
    let check = true
    let userobj = {}
    let cartobj = {}
    let historyobj = {}
    let purchaseobj = {}
    let tempArr = []
    cartobj.ProductID = tempArr
    historyobj.Details = tempArr
    purchaseobj.History = tempArr
    userobj.Username = $('#regis-username').val()
    userobj.Email = $('#regis-email').val()
    userobj.Password = $('#regis-password').val()
    userobj.Name = $('#regis-username').val()
    userobj.Avatar = ""
    userobj.Wallet = 0
    userobj.Role = "user"
    var repeat = $('#regis-r-password').val()
    if (userobj.Password == repeat && userobj.Username != '') {
        $.ajax({
            url: 'http://localhost:3000/Users',
            method: "GET",
            dataType: "JSON",
            success: function (data) {
                $.each(data, function (i, v) {
                    if (v.Username == userobj.Username) {
                        check = false
                    }
                });
                if (check == true) {
                    $.ajax({
                        url: 'http://localhost:3000/Users',
                        method: "POST",
                        dataType: "JSON",
                        contentType: "application/JSON",
                        data: JSON.stringify(userobj),
                        success: function (data0) {
                            cartobj.UserID = data0.id
                            historyobj.UserID = data0.id
                            purchaseobj.UserID = data0.id
                            $.ajax({
                                url: 'http://localhost:3000/Carts',
                                method: "POST",
                                dataType: "JSON",
                                contentType: "application/JSON",
                                data: JSON.stringify(cartobj),
                                success: function (data1) {
                                    $.ajax({
                                        url: 'http://localhost:3000/History',
                                        method: "POST",
                                        dataType: "JSON",
                                        contentType: "application/JSON",
                                        data: JSON.stringify(historyobj),
                                        success: function (data2) {
                                            $.ajax({
                                                url: 'http://localhost:3000/Recharge',
                                                method: "POST",
                                                dataType: "JSON",
                                                contentType: "application/JSON",
                                                data: JSON.stringify(purchaseobj),
                                                success: function (data3) {
                                                    sessions.session(data0.id)
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
                else {
                    $('#alert-sign-up').empty()
                    $('#alert-sign-up').append(
                        '<div class="alert alert-warning alert-dismissible fade show" role="alert">'
                        + 'Already have an account'
                        + '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
                        + '<span aria-hidden="true">&times;</span>'
                        + '</button>'
                        + '</div>'
                    )
                }
            }
        })

    }
    else {
        $('#alert-sign-up').empty()
        $('#alert-sign-up').append(
            '<div class="alert alert-warning alert-dismissible fade show" role="alert">'
            + 'Registration information is not correct'
            + '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
            + '<span aria-hidden="true">&times;</span>'
            + '</button>'
            + '</div>'
        )
    }
}
sessions.session = function (id) {
    let sessionObj = {};
    sessionObj.id = 1;
    sessionObj.userid = id;
    $.ajax({
        url: 'http://localhost:3000/Session/1',
        method: "PUT",
        dataType: "JSON",
        contentType: "application/JSON",
        data: JSON.stringify(sessionObj),
        success: function (data) {
            window.location.href = "../index.html";
        }
    })
}
sessions.logout = function () {
    let sessionObj = {};
    sessionObj.id = 1;
    sessionObj.userid = 0;
    $.ajax({
        url: 'http://localhost:3000/Session/1',
        method: "PUT",
        dataType: "JSON",
        contentType: "application/JSON",
        data: JSON.stringify(sessionObj),
        success: function (data) {
            $('#get-session').empty()
            $('#get-session').val(0)
            GetNavBar()
        }
    })
}
users.GetProfile = function () {
    $.ajax({
        url: 'http://localhost:3000/Session/1',
        method: "GET",
        dataType: "JSON",
        success: function (dataa) {
            $.ajax({
                url: 'http://localhost:3000/Users/' + dataa.userid,
                method: "GET",
                dataType: "JSON",
                success: function (data) {
                    $('#profile-body').empty()
                    $('#profile-body').append('<div class="profile-link" id="profile-link">'
                        + '<a href="index.html">Home</a>'
                        + '<a >></a>'
                        + '<a href="#" onclick="users.GetProfile()">Profile</a>'
                        + '</div>'
                        + '<div class="container">'
                        + '<div class="row">'
                        + '<div class="col-sm-4">'
                        + '<class class="card">'
                        + '<h5 class="card-header">My Infomation</h5>'
                        + '<div class="card-body">'
                        + '<a class="nav-item nav-link" href="#" onclick="users.GetProfile()">Infomation & Contact</a> '
                        + '<a class="nav-item nav-link" href="#" onclick="carts.GetCart()">Carts</a>'
                        + '<a class="nav-item nav-link" href="#" onclick="users.changePasswordProfile()">Change your password</a>'
                        + '<a class="nav-item nav-link" href="#" onclick="PurchaseHistory()">Purchase history</a>'
                        + '<a class="nav-item nav-link" href="#" onclick="RechargeHistory()">Recharge history</a>'
                        + '</div>'
                        + '</class>'
                        + '</div>'
                        + '<div class="col-sm-8">'
                        + '<div class="card" id = "IAC">'
                        + '<h5 class="card-header">Infomation and Contact</h5>'
                        + '<div class="card-body">'
                        + '<div class="container">'
                        + '<div class="row">'
                        + '<div class="col-sm-4">'
                        + '<img src="" id="pf-img" class="rounded-circle img-prf" alt="No file chosen">'
                        + '</div>'
                        + '<div class="col-sm-8">'
                        + '<form >'
                        + '<div class="d-flex ml-auto align-items-center" >'
                        + '<b class="w-25 text-left">Name:</b>'
                        + '<p class="  ml-1" id="pf-name">' + data.Name + '</p>'
                        + '</div>'
                        + '<div class="d-flex ml-auto align-items-center" >'
                        + '<b class="w-25 text-left">Username:</b>'
                        + '<p class="  ml-1" id="pf-username">' + data.Username + '</p>'
                        + '</div>'
                        + '<div class="d-flex ml-auto align-items-center " >'
                        + '<b class="w-25 text-left">Email:</b>'
                        + '<p class="ml-1" id="pf-email">' + data.Email + '</p>'
                        + '</div>'
                        + '<div class="d-flex ml-auto align-items-center" >'
                        + '<b class="w-25 text-left">Wallet:</b>'
                        + '<p class="ml-1" id="pf-wallet">' + data.Wallet + '</p>'
                        + '</div>  '
                        + '<a href="#" class="btn btn-danger float-right" onclick="users.updateInfoUsers()">Update &nbsp;<i class="fas fa-pencil-alt"></i></a>'
                        + '</form>'
                        + '</div>'
                        + '</div></div>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</div>')
                    users.ProfileInformation()
                }
            })
        }
    })
}
users.updateInfoUsers = function () {

    $('#IAC').empty()
    $('#IAC').append('<h5 class="card-header">Infomation and Contact</h5>'
        + '<div class="card-body">'
        + '<div class="container">'
        + '<div class="row">'
        + '<div class="col-sm-4">'
        + '<img src="" id="pf-img" class="rounded-circle" alt="No file chosen">'
        + '<div class="upload-btn-wrapper">'
        + '<button class="btn btn-danger">Upload a file</button>'
        + '<input type="file" name="myfile" onchange="users.uploadImageProfile(this)" />'
        + '</div>'
        + '</div>'
        + '<div class="col-sm-8">'
        + '<form >'
        + '<div class="d-flex ml-auto align-items-center mb-4" >'
        + '<label for="inputEmail3 " class="w-25 text-left">Name:</label>'
        + '<input type="text" class="form-control w-100 ml-3" id="pf-up-name" placeholder="Name" >'
        + '</div>'
        + '<div class="d-flex ml-auto align-items-center mb-4" >'
        + '<label for="inputEmail3" class="w-25 text-left"> UserName:</label>'
        + '<input type="text" class="form-control w-100 ml-3" id="pf-up-username" placeholder="Username" >'
        + '</div>'
        + '<div class="d-flex ml-auto align-items-center mb-4" >'
        + '<label for="inputEmail3" class="w-25 text-left"> Email:</label>'
        + '<input type="text" class="form-control w-100 ml-3" id="pf-up-email" placeholder="Email" >'
        + '<input type="text" class="form-control w-100 ml-3" id="pf-up-password" hidden>'
        + '<input type="text" class="form-control w-100 ml-3" id="pf-up-wallet" hidden>'
        + '<input type="text" class="form-control w-100 ml-3" id="pf-up-role" hidden>'
        + '</div>'

        + '<a href="#" class="btn btn-danger float-right" onclick="users.updateUser()" >Update &nbsp;<i class="fas fa-pencil-alt"></i></a>'
        + '</form>'
        + '</div>'
        + '</div></div>'
        + '</div>'
    )
    users.ProfileInformation()
}
users.updateUser = function () {
    let x = document.getElementById("get-session").value
    let userobj = {}
    userobj.Name = $('#pf-up-name').val()
    userobj.Username = $('#pf-up-username').val()
    userobj.Password = $('#pf-up-password').val()
    userobj.Email = $('#pf-up-email').val()
    userobj.Wallet = $('#pf-up-wallet').val()
    userobj.Avatar = $('#pf-img').attr("src")
    userobj.Role = $('#pf-up-role').val()
    $.ajax({
        url: 'http://localhost:3000/Users/' + x,
        method: "PUT",
        dataType: "JSON",
        contentType: "application/JSON",
        data: JSON.stringify(userobj),
        success: function (data) {
            users.GetProfile()
        }
    })
}
users.changePasswordProfile = function () {
    $('#profile-link').empty()
    $('#profile-link').append(
        '<a href="index.html">Home</a>'
        + '<a >></a>'
        + '<a href="#" onclick="users.GetProfile()">Profile</a>'
        + '<a >></a>'
        + '<a href="#" onclick="users.changePasswordProfile()">Change your password</a>'
    )
    $('#IAC').empty()
    $('#IAC').append('<h5 class="card-header">Change your password</h5>'
        + '<div id = "alert-cp">'
        + '</div>'
        + '<div class="card-body">'
        + '<form>'
        + '<div class="form-group text-left font-weight-bold">'
        + '<label for="exampleInputPassword1" >Password</label>'
        + '<input type="password" class="form-control" id="cp-password" placeholder="Password">'
        + '</div>'
        + '<div class="form-group text-left font-weight-bold">'
        + '<label for="exampleInputPassword1" >New Password</label>'
        + '<input type="password" class="form-control" id="cp-new-password" placeholder="New Password">'
        + '</div>'
        + '<div class="form-group text-left font-weight-bold">'
        + '<label for="exampleInputPassword1" >Repeat Password</label>'
        + '<input type="password" class="form-control" id="cp-repeat" placeholder="Repeat Password">'
        + '<input type="text" class="form-control" id="cp-name" hidden>'
        + '<input type="text" class="form-control" id="cp-username" hidden>'
        + '<input type="text" class="form-control" id="cp-email" hidden>'
        + '<input type="text" class="form-control" id="cp-wallet" hidden>'
        + '<img src="" id="cp-avatar" alt="" hidden>'
        + '<input type="text" class="form-control" id="cp-role" hidden>'
        + '<input type="text" class="form-control" id="cp-old-password" hidden>'
        + '</div>  '
        + '<button type="submit" class="btn btn-danger float-right" onclick="users.changePasswordUsers()">Submit</button>'
        + '</form>'
        + '</div>'
    )
    users.ProfileInformation()
}
users.changePasswordUsers = function () {
    let x = document.getElementById("get-session").value
    let userobj = {}
    userobj.Name = $('#cp-name').val()
    userobj.Username = $('#cp-username').val()
    userobj.Password = $('#cp-new-password').val()
    userobj.Email = $('#cp-email').val()
    userobj.Wallet = $('#cp-wallet').val()
    userobj.Avatar = $('#cp-avatar').attr("src")
    userobj.Role = $('#cp-role').val()
    let oldPassword = $('#cp-old-password').val()
    let password = $('#cp-password').val()
    let repeatPassword = $('#cp-repeat').val()
    if (password == oldPassword && userobj.Password == repeatPassword) {
        $.ajax({
            url: 'http://localhost:3000/Users/' + x,
            method: "PUT",
            dataType: "JSON",
            contentType: "application/JSON",
            data: JSON.stringify(userobj),
            success: function (data) {
                users.GetProfile()
            }
        })
    }
    else {
        $('#alert-cp').empty()
        $('#alert-cp').append(
            '<div class="alert alert-warning alert-dismissible fade show w-50 mt-3 mb-0 ml-4" role="alert">'
            + 'Incorrect information'
            + '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
            + '<span aria-hidden="true">&times;</span>'
            + '</button>'
            + '</div>'
        )
    }
}
users.ProfileInformation = function () {
    let x = document.getElementById("get-session").value
    $.ajax({
        url: 'http://localhost:3000/Users',
        method: "GET",
        dataType: "JSON",
        success: function (data) {
            $.each(data, function (i, v) {
                if (x == v.id) {
                    $('#pf-name').empty()
                    $('#pf-username').empty()
                    $('#pf-email').empty()
                    $('#pf-wallet').empty()
                    $('#pf-img').empty()
                    $('#pf-up-password').empty()
                    $('#pf-up-wallet').empty()
                    $('#pf-up-role').empty()

                    $('#cp-name').empty()
                    $('#cp-username').empty()
                    $('#cp-password').empty()
                    $('#cp-email').empty()
                    $('#cp-wallet').empty()
                    $('#cp-avatar').empty()
                    $('#cp-role').empty()

                    $('#pf-name').append(v.Name)
                    $('#pf-username').append(v.Username)
                    $('#pf-email').append(v.Email)
                    $('#pf-wallet').append(ConvertCurreny(v.Wallet, 1))
                    $('#pf-img').attr("src", v.Avatar)

                    $('#pf-up-name').val(v.Name)
                    $('#pf-up-username').val(v.Username)
                    $('#pf-up-email').val(v.Email)
                    $('#pf-up-password').val(v.Password)
                    $('#pf-up-wallet').val(v.Wallet)
                    $('#pf-up-role').val(v.Role)

                    $('#cp-name').val(v.Name)
                    $('#cp-username').val(v.Username)
                    $('#cp-old-password').val(v.Password)
                    $('#cp-email').val(v.Email)
                    $('#cp-wallet').val(v.Wallet)
                    $('#cp-avatar').attr("src", v.Avatar)
                    $('#cp-role').val(v.Role)
                }
            })
        }
    })
}
users.uploadImageProfile = function (input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#pf-img').attr('src', e.target.result)
        };
        reader.readAsDataURL(input.files[0])
    }
}
carts.GetCart = function () {

    $('#profile-link').empty()
    $('#IAC').empty()
    $('#profile-link').append(
        '<a href="index.html">Home</a>'
        + '<a >></a>'
        + '<a href="#" onclick="users.GetProfile()">Profile</a>'
        + '<a >></a>'
        + '<a href="#" onclick="carts.GetCart()">Carts</a>'
    )

    $('#IAC').append(
        '<h5 class="card-header">Carts</h5>'
        + '<div class="card-body">'
        + '<table class="table table-hover">'
        + '<thead>'
        + '<tr>'
        + '<th scope="col">#</th>'
        + '<th scope="col">Name</th>'
        + '<th scope="col">Image</th>'
        + '<th scope="col">Price</th>'
        + '<th scope="col">Amount</th>'
        + '<th scope="col">Total</th>'
        + '<th scope="col"></th>'
        + '</tr>'
        + '</thead>'
        + '<tbody id ="cart-item">'
        + '</tbody>'
        + '</table>'
        + '</div>'
        + '<div id = "total-money" class="d-flex align-items-end flex-column bd-highlight mb-3">'
        + '</div>'
        + '<input type="text" value="" id="carts-id" hidden>'
        + '<input type="text" value="" id="carts-userid" hidden>'
    )
    carts.itemCart()
}
carts.itemCart = function () {
    $.ajax({
        url: 'http://localhost:3000/Session/1',
        method: "GET",
        dataType: "JSON",
        success: function (data01) {
            $.ajax({
                url: 'http://localhost:3000/Carts',
                method: "GET",
                dataType: "JSON",
                success: function (data) {
                    let totalmoney = 0
                    $('#cart-item').empty()
                    $('#carts-id').empty()
                    $('#carts-userid').empty()
                    $('#total-money').empty()
                    let arr = []
                    $.each(data, function (i, v) {
                        if (v.UserID == data01.userid) {
                            $('#carts-id').val(v.id)
                            $('#carts-userid').val(v.UserID)
                            let arrayId = [];
                            for (let i = 0; i < v.ProductID.length; i++) {
                                if (!arrayId.includes(v.ProductID[i])) {
                                    let count = Count(v.ProductID, v.ProductID[i]);
                                    $.ajax({
                                        url: 'http://localhost:3000/Guitars/' + v.ProductID[i],
                                        method: "GET",
                                        dataType: "JSON",
                                        success: function (dataa) {
                                            $('#total-money').empty()
                                            totalmoney = totalmoney + Number(dataa.Price * count)
                                            $('#cart-item').append('<tr>'
                                                + '<th scope="row">' + i + '</th>'
                                                + '<td>' + dataa.Name + '</td>'
                                                + '<td><img src="' + dataa.Images[1] + '" alt=""></td>'
                                                + '<td>' + ConvertCurreny(dataa.Price, 1) + '</td>'
                                                + '<td><input type="number" value="' + count + '" id ="amount-price' + i + '"></td>'
                                                + '<td id="abc' + i + '"></td>'
                                                + '<td><a ><i class="fas fa-trash-alt" data-toggle="modal" data-target="#delete-cart" onclick="DeleteItem(' + v.id + ',' + dataa.id + ')"></i></a></td>'
                                                + '<td hidden><input type="text" id="card-p-id' + i + '" value="' + dataa.id + '"></td>'
                                                + '</tr>')
                                            $("#abc" + i).append(Total(dataa, i))
                                            AmountItem(i)
                                            $('#total-money').append('<div class=" bd-highlight ">'
                                                + '<p class="text-right text-dark pb-4 h6 mt-my" style="padding-right: 20px; margin-right: 0px"><b>Total:</b>' + ConvertCurreny(totalmoney, 1) + '</p>'
                                                + '</div>'
                                                + '<div class="bd-highlight" style="padding-right: 20px; margin-right: 40px">'
                                                + '<a class="btn btn-danger text-light mt-my w-my" id="' + v.id + '" onclick="PayCart(' + v.id + ',' + totalmoney + ')">Pay</a>'
                                                + '</div>')
                                        }
                                    })
                                    arrayId.push(v.ProductID[i])
                                }
                            }
                        }
                    })

                }
            })
        }
    })

}
function Count(arr, value) {
    let count = 0;
    for (let i = 0; i < arr.length; i++)
        if (arr[i] == value)
            count++;
    return count;
}
function TotalMoney(price, count) {
    return Number(price * count)
}
function Total(vv, index) {
    return ConvertCurreny(vv.Price, ($('#amount-price' + index).val()))
}
function AmountItem(index) {
    let input = document.querySelector('#amount-price' + index)
    input.addEventListener('keyup', (e) => {
        if (e.keyCode === 13) {
            console.log(e.target.value)
            let cartobj = {}
            let idCart = document.getElementById("carts-id").value
            cartobj.UserID = document.getElementById("carts-userid").value

            let amount = $('#amount-price' + index).val()
            let productID = $('#card-p-id' + index).val()
            cartobj.ProductID = GetCartUpdate(idCart, amount, productID, cartobj)
        }
    })
}
function GetCartUpdate(id, amount, productID, cartobj) {
    let arrProduct = []
    $.ajax({
        url: 'http://localhost:3000/Carts/' + id,
        method: "GET",
        dataType: "JSON",
        success: function (data) {
            for (let index = 0; index < data.ProductID.length; index++) {
                if (data.ProductID[index] != productID) {
                    arrProduct.push(data.ProductID[index])
                }
            }
            for (let i = 0; i < amount; i++) {
                arrProduct.push(Number(productID))
            }
            cartobj.ProductID = arrProduct
            $.ajax({
                url: 'http://localhost:3000/Carts/' + id,
                method: "PUT",
                dataType: "JSON",
                contentType: "application/JSON",
                data: JSON.stringify(cartobj),
                success: function (data) {
                    carts.GetCart()
                }
            })
        }
    })
}
function DeleteItem(id, idproduct) {
    swal({
        title: "Delete?",
        buttons: ["Cancel", "Delete"],
        icon: "warning",
    })
        .then((willDelete) => {
            if (willDelete) {
                let cartObj = {}
                let temp = []
                $.ajax({
                    url: 'http://localhost:3000/Carts/' + id,
                    method: "GET",
                    dataType: "JSON",
                    success: function (data) {
                        cartObj.UserID = data.UserID
                        for (let index = 0; index < data.ProductID.length; index++) {
                            if (data.ProductID[index] != idproduct) {
                                temp.push(data.ProductID[index])
                            }
                        }
                        cartObj.ProductID = temp
                        $.ajax({
                            url: 'http://localhost:3000/Carts/' + id,
                            method: "PUT",
                            dataType: "JSON",
                            contentType: "application/JSON",
                            data: JSON.stringify(cartObj),
                            success: function (data) {
                                GetNavBar()
                                carts.GetCart()
                            }
                        })
                    }
                })
            }
        });
}
function PayCart(id, total) {
    let x = document.getElementById("get-session").value
    $.ajax({
        url: 'http://localhost:3000/Users/' + id,
        method: "GET",
        dataType: "JSON",
        success: function (data) {
            if (data.Wallet >= total) {
                let userobj = {}
                userobj.Username = data.Username
                userobj.Email = data.Email
                userobj.Password = data.Password
                userobj.Name = data.Name
                userobj.Avatar = data.Avatar
                userobj.Role = data.Role
                userobj.Wallet = Number(data.Wallet - total)
                $.ajax({
                    url: 'http://localhost:3000/Users/' + id,
                    method: "PUT",
                    dataType: "JSON",
                    contentType: "application/JSON",
                    data: JSON.stringify(userobj),
                    success: function (data1) {
                        $.ajax({
                            url: 'http://localhost:3000/Carts/' + id,
                            method: "GET",
                            dataType: "JSON",
                            success: function (data2) {
                                let cartobj = {}
                                cartobj.UserID = data2.UserID
                                let detailobj = {}
                                detailobj.ProductID = data2.ProductID
                                console.log(detailobj.ProductID)
                                var today = new Date();
                                var date = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
                                detailobj.date = date
                                detailobj.PaymentStatus = "paid"
                                var hash = "012346789";
                                var random8 = '';
                                for (var i = 0; i < 5; i++) {
                                    random8 += hash[parseInt(Math.random() * hash.length)];
                                }
                                detailobj.Name = "DH" + random8
                                let cartobj2 = {}
                                cartobj2.UserID = data2.UserID
                                let temp = []
                                cartobj2.ProductID = temp
                                $.ajax({
                                    url: 'http://localhost:3000/History',
                                    method: "GET",
                                    dataType: "JSON",
                                    success: function (data3) {
                                        $.each(data3, function (i, v) {
                                            if (v.UserID == cartobj.UserID) {
                                                cartobj.Details = v.Details
                                                let count = v.Details.length
                                                count++
                                                console.log(count)
                                                detailobj.id = count
                                                cartobj.Details.push(detailobj)
                                                for (let index = 0; index < v.Details.length; index++) {
                                                    $.ajax({
                                                        url: 'http://localhost:3000/History/' + v.id,
                                                        method: "PUT",
                                                        dataType: "JSON",
                                                        contentType: "application/JSON",
                                                        data: JSON.stringify(cartobj),
                                                        success: function (data0) {
                                                            $.ajax({
                                                                url: 'http://localhost:3000/Carts/' + id,
                                                                method: "PUT",
                                                                dataType: "JSON",
                                                                contentType: "application/JSON",
                                                                data: JSON.stringify(cartobj2),
                                                                success: function (data) {
                                                                    GetNavBar()
                                                                    carts.itemCart()
                                                                }
                                                            })

                                                        }
                                                    })
                                                }
                                            }
                                        })
                                    }
                                })

                            }
                        })
                    }
                })
            }
            else {
                var myModal = new bootstrap.Modal(document.getElementById('check-money'), {})
                myModal.toggle()
            }
        }
    })
}
function AddToCart(productID) {
    let x = document.getElementById("get-session").value
    $.ajax({
        url: 'http://localhost:3000/Carts',
        method: "GET",
        dataType: "JSON",
        success: function (data) {
            let cartobj = {}
            $.each(data, function (i, v) {
                if (v.UserID == x) {
                    cartobj.UserID = v.UserID
                    cartobj.ProductID = v.ProductID
                    cartobj.ProductID.push(productID)
                    $.ajax({
                        url: 'http://localhost:3000/Carts/' + v.id,
                        method: "PUT",
                        dataType: "JSON",
                        contentType: "application/JSON",
                        data: JSON.stringify(cartobj),
                        success: function (data) {
                            swal({
                                title: "Success",
                                buttons: ["OK!", "Go to Cart!"],
                                icon: "data:image/png;base64,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",
                            })
                                .then((willDelete) => {
                                    if (willDelete) {
                                        window.location.href = "profile.html#load-account-info";

                                    }
                                });
                        }
                    })
                }
            })
        }
    })
}
function PurchaseHistory() {
    $('#profile-link').empty()
    $('#profile-link').append(
        '<a href="index.html">Home</a>'
        + '<a >></a>'
        + '<a href="#" onclick="users.GetProfile()">Profile</a>'
        + '<a >></a>'
        + '<a href="#" onclick="PurchaseHistory()">Purchase History</a>'
    )
    $('#IAC').empty()
    $('#IAC').append(
        '<h5 class="card-header">Purchase History</h5>'
        + '<div class="card-body">'
        + '<table class="table table-hover">'
        + '<thead>'
        + '<tr>'
        + '<th scope="col">#</th>'
        + '<th scope="col">Name</th>'
        + '<th scope="col">Order value</th>'
        + '<th scope="col">Paid at</th>'
        + '<th scope="col">Status</th>'
        + '<th scope="col"></th>'
        + '</tr>'
        + '</thead>'
        + '<tbody id ="cart-item">'
        + '</tbody>'
        + '</table>'
        + '</div>'
        + '<div id = "total-money-1" class="d-flex align-items-end flex-column bd-highlight mb-3">'
        + '<div class=" bd-highlight mt-2" id="total-historyy">'
        + '</div>'
        + '</div>'
        + '<input type="text" value="" id="carts-id" hidden>'
        + '<input type="text" value="" id="carts-userid" hidden>'
    )
    ItemHistory()
}
function ItemHistory() {
    let x = document.getElementById("get-session").value
    $('#get-total-history').val(0)
    $.ajax({
        url: 'http://localhost:3000/History',
        method: "GET",
        dataType: "JSON",
        success: function (data) {
            $('#cart-item').empty()
            $.each(data, function (i, v) {
                if (v.UserID == x) {
                    for (let index = 0; index < v.Details.length; index++) {
                        let total1 = 0
                        let total = 0
                        $('#cart-item').append(
                            '<tr>'
                            + '<td>' + index + '</td>'
                            + '<td>' + v.Details[index].Name + '</td>'
                            + '<td id="qwer' + index + '"></td>'
                            + '<td>' + v.Details[index].date + '</td>'
                            + '<td>' + v.Details[index].PaymentStatus + '</td>'
                            + '<td><a onclick="DetailsHistory(' + v.id + ',' + v.Details[index].id + ',' + index + ')" data-toggle="modal" data-target="#details-history"><i class="fas fa-info-circle"></i></a></td>'
                            + '<tr>'
                        )
                        for (let i = 0; i < v.Details[index].ProductID.length; i++) {
                            $.ajax({
                                url: 'http://localhost:3000/Guitars',
                                method: "GET",
                                dataType: "JSON",
                                success: function (data1) {
                                    $.each(data1, function (i1, v1) {
                                        if (v.Details[index].ProductID[i] == v1.id) {
                                            $("#qwer" + index).empty()
                                            total += +v1.Price
                                            $("#qwer" + index).append(ConvertCurreny(total, 1))
                                            if (i == v.Details[index].ProductID.length - 1 || v.Details[index].ProductID.length == 1) {
                                                $('#total-historyy').empty()
                                                total1 = Number($('#get-total-history').val()) + total
                                                $('#get-total-history').val(Number(total1))
                                                $('#total-historyy').append('<p class="text-right text-dark pb-4 h6 mt-my" style="padding-right: 20px; margin-right: 0px"><b>Total:</b>' + ConvertCurreny($('#get-total-history').val(), 1) + '</p>'
                                                )
                                            }
                                        }
                                    })
                                }
                            })
                        }
                    }
                }
            })
        }
    })
}
function ItemPurchase() {
    let x = document.getElementById("get-session").value
    $.ajax({
        url: 'http://localhost:3000/History',
        method: "GET",
        dataType: "JSON",
        success: function (data) {
            let totalmoney = 0
            $('#cart-item').empty()
            $('#carts-id').empty()
            $('#carts-userid').empty()
            $('#total-money').empty()
            let arr = []
            $.each(data, function (i, v) {
                if (v.UserID == x) {
                    $('#carts-id').val(v.id)
                    $('#carts-userid').val(v.UserID)
                    let arrayId = [];
                    for (let i = 0; i < v.ProductID.length; i++) {
                        if (!arrayId.includes(v.ProductID[i])) {
                            let count = Count(v.ProductID, v.ProductID[i]);
                            $.ajax({
                                url: 'http://localhost:3000/Guitars/' + v.ProductID[i],
                                method: "GET",
                                dataType: "JSON",
                                success: function (dataa) {
                                    $('#total-money').empty()
                                    totalmoney = totalmoney + Number(dataa.Price * count)
                                    $('#cart-item').append('<tr>'
                                        + '<th scope="row">' + i + '</th>'
                                        + '<td>' + dataa.Name + '</td>'
                                        + '<td><img src="' + dataa.Images[1] + '" alt=""></td>'
                                        + '<td>' + ConvertCurreny(dataa.Price, 1) + '</td>'
                                        + '<td><input type="number" value="' + count + '" id ="amount-price' + i + '"></td>'
                                        + '<td id="abc' + i + '"></td>'
                                        + '<td><a ><i class="fas fa-trash-alt" data-toggle="modal" data-target="#delete-cart" onclick="DeleteItem(' + v.id + ',' + dataa.id + ')"></i></a></td>'
                                        + '<td hidden><input type="text" id="card-p-id' + i + '" value="' + dataa.id + '"></td>'
                                        + '</tr>')
                                    $("#abc" + i).append(Total(dataa, i))
                                    AmountItem(i)
                                    $('#total-money').append('<div class=" bd-highlight ">'
                                        + '<p class="text-right text-dark pb-4 h6 mt-my" style="padding-right: 20px; margin-right: 0px"><b>Total:</b>' + ConvertCurreny(totalmoney, 1) + '</p>'
                                        + '</div>'
                                        + '<div class="bd-highlight" style="padding-right: 20px; margin-right: 40px">'
                                        + '<a class="btn btn-danger text-light mt-my w-my" id="' + v.id + '" onclick="PayCart(' + v.id + ',' + totalmoney + ')">Pay</a>')
                                        + '</div>'
                                }
                            })
                            arrayId.push(v.ProductID[i])
                        }
                    }
                }
            })

        }
    })
}
$(function () {
    $(window).bind("hashchange", showAccountInfo());
});
function showAccountInfo() {
    if (window.location.hash == "#load-account-info")
        getCart1()
    else users.GetProfile()
}
function getCart1() {
    $('#profile-body').empty()
    $('#profile-body').append('<div class="profile-link" id="profile-link">'
        + '<a href="index.html">Home</a>'
        + '<a >></a>'
        + '<a href="#" onclick="users.GetProfile()">Profile</a>'
        + '<a >></a>'
        + '<a href="#" onclick="carts.GetCart()">Carts</a>'
        + '</div>'
        + '<div class="container">'
        + '<div class="row">'
        + '<div class="col-sm-4">'
        + '<class class="card">'
        + '<h5 class="card-header">My Infomation</h5>'
        + '<div class="card-body">'
        + '<a class="nav-item nav-link" href="#" onclick="users.GetProfile()">Infomation & Contact</a> '
        + '<a class="nav-item nav-link" href="#" onclick="carts.GetCart()">Carts</a>'
        + '<a class="nav-item nav-link" href="#" onclick="users.changePasswordProfile()">Change your password</a>'
        + '<a class="nav-item nav-link" href="#" onclick="PurchaseHistory()">Purchase history</a>'
        + '<a class="nav-item nav-link" href="#" onclick="RechargeHistory()">Recharge history</a>'
        + '</div>'
        + '</class>'
        + '</div>'
        + '<div class="col-sm-8">'
        + '<div class="card" id = "IAC">'
        + '<h5 class="card-header">Carts</h5>'
        + '<div class="card-body">'
        + '<table class="table table-hover">'
        + '<thead>'
        + '<tr>'
        + '<th scope="col">#</th>'
        + '<th scope="col">Name</th>'
        + '<th scope="col">Image</th>'
        + '<th scope="col">Price</th>'
        + '<th scope="col">Amount</th>'
        + '<th scope="col">Total</th>'
        + '<th scope="col"></th>'
        + '</tr>'
        + '</thead>'
        + '<tbody id ="cart-item">'
        + '</tbody>'
        + '</table>'
        + '</div>'
        + '<div id = "total-money" class="d-flex align-items-end flex-column bd-highlight mb-3">'
        + '</div>'
        + '<input type="text" value="" id="carts-id" hidden>'
        + '<input type="text" value="" id="carts-userid" hidden>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>'
    )
    carts.itemCart()
}
function DetailsHistory(id, prID, index) {
    $('#form-history-id').empty()
    $('#form-history-name').empty()
    $('#form-history-username').empty()
    $('#form-history-time').empty()
    $('#form-history-status').empty()
    $.ajax({
        url: 'http://localhost:3000/History/' + id,
        method: "GET",
        dataType: "JSON",
        success: function (data) {
            $('#form-history-table').empty()
            for (let index = 0; index < data.Details.length; index++) {
                let totalmoney = 0
                if (data.Details[index].id == prID) {
                    $.ajax({
                        url: 'http://localhost:3000/Users/' + data.UserID,
                        method: "GET",
                        dataType: "JSON",
                        success: function (data1) {
                            $('#form-history-id').val(id)
                            $('#form-history-name').val(data.Details[index].Name)
                            $('#form-history-username').val(data1.Name)
                            $('#form-history-time').val(data.Details[index].date)
                            $('#form-history-status').val(data.Details[index].PaymentStatus)
                            let arrayId = []
                            for (let i = 0; i < data.Details[index].ProductID.length; i++) {

                                if (!arrayId.includes(data.Details[index].ProductID[i])) {
                                    let count = Count(data.Details[index].ProductID, data.Details[index].ProductID[i]);
                                    $.ajax({
                                        url: 'http://localhost:3000/Guitars/' + data.Details[index].ProductID[i],
                                        method: "GET",
                                        dataType: "JSON",
                                        success: function (data0) {
                                            $('#form-history-table').append('<tr>'
                                                + '<th scope="row">' + i + '</th>'
                                                + '<td>' + data0.Name + '</td>'
                                                + '<td><img src="' + data0.Images[1] + '" alt=""></td>'
                                                + '<td>' + ConvertCurreny(data0.Price, 1) + '</td>'
                                                + '<td><input type="number" value="' + count + '" id ="amount-price' + i + '" readonly></td>'
                                                + '<td id="abc' + i + '"></td>'
                                                + '</tr>')
                                            $("#abc" + i).append(Total(data0, i))
                                        }
                                    })
                                    arrayId.push(data.Details[index].ProductID[i])
                                }
                            }
                        }
                    })
                }
            }
        }
    })
}
function RechargeHistory() {
    $('#profile-link').empty()
    $('#profile-link').append(
        '<a href="index.html">Home</a>'
        + '<a >></a>'
        + '<a href="#" onclick="users.GetProfile()">Profile</a>'
        + '<a >></a>'
        + '<a href="#" onclick="RechargeHistory()">Recharge History</a>'
    )
    $('#IAC').empty()
    $('#IAC').append(
        '<h5 class="card-header">Recharge History</h5>'
        + '<div class="card-body">'
        + '<table class="table table-hover">'
        + '<thead>'
        + '<tr>'
        + '<th scope="col">#</th>'
        + '<th scope="col">Name</th>'
        + '<th scope="col">Bank name</th>'
        + '<th scope="col">Money</th>'
        + '<th scope="col">Date</th>'
        + '</tr>'
        + '</thead>'
        + '<tbody id ="cart-item">'
        + '</tbody>'
        + '</table>'
        + '</div>'
        + '<div id = "total-money-1" class="d-flex align-items-end flex-column bd-highlight mb-3">'
        + '<div class=" bd-highlight mt-2" id="total-historyy">'
        + '</div>'
        + '</div>'
    )
    ItemRecharge()
}
function ItemRecharge() {
    let session = $('#get-session').val()
    $('#card-item').empty()

    $.ajax({
        url: 'http://localhost:3000/Recharge',
        method: "GET",
        dataType: "JSON",
        success: function (data) {
            $.each(data, function (i, v) {
                if (v.UserID == session) {
                    let total  = 0
                    for (let index = 0; index < v.History.length; index++) {
                        total = total + Number(v.History[index].Money)
                        $('#total-historyy').empty()
                        $('#total-historyy').append('<p class="text-right text-dark pb-4 h6 mt-my" style="padding-right: 20px; margin-right: 0px"><b>Total:</b>'+ConvertCurreny(total,1)+'</p>')
                        $.ajax({
                            url: 'http://localhost:3000/Bank/' + v.History[index].BankID,
                            method: "GET",
                            dataType: "JSON",
                            success: function (data0) {                        
                                $('#cart-item').append('<tr>'
                                    + '<td>'+index+'</td>'
                                    + '<td>'+v.History[index].Name+'</td>'
                                    + '<td>'+data0.name+'</td>'
                                    + '<td>'+ConvertCurreny(v.History[index].Money,1)+'</td>'
                                    + '<td>'+v.History[index].Date+'</td>'
                                    + '<tr>')
                            }
                        })
                    }
                }
            })
        }
    })
}
function RandomName() {
    var hash = "012346789";
    var random8 = '';
    for (var i = 0; i < 5; i++) {
        random8 += hash[parseInt(Math.random() * hash.length)];
    }
    return random8
}
$(document).ready(function () {
    guitars.getArr();
    guitars.getArray();
    brands.GetBrand();
})
