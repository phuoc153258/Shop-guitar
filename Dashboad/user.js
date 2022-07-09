function UsersManagement() {
    $('#nav-list').empty()
    $('#nav-list').append('<li class="nav-item nav-hover mt-1 mb-1">'
        + '<a class="nav-link" data-toggle="collapse" href="#form-elements" aria-expanded="false"'
        + 'aria-controls="form-elements" onclick="ProductManagement()">'
        + '<i class="fas fa-guitars "></i>'
        + '<span class="menu-title ml-3">Products Management</span>'
        + '</a>'
        + '</li>'
        + '<li class="nav-item active mt-1 mb-1">'
        + '<a class="nav-link" onclick="UsersManagement()">'
        + '<i class="fas fa-users w-14 my-color-white"></i>'
        + '<span class="menu-title ml-3">Users Management</span>'
        + '</a>'
        + '</li>')
    UserBodyDashboard()
}
function UserBodyDashboard() {
    $('#body-dashboad').empty()
    $('#body-dashboad').append('<div class="row">'
        + '<div class="col-sm-6">'
        + '<h4 class="card-title">Users Management</h4>'
        + '</div>'
        + '<div class="col-sm-6 d-flex justify-content-end">'
        + '<a class="btn btn-danger my-color-white" data-toggle="modal" data-target="#modal-update-product" onclick="DisplayFooterCreate()">New User</a>'
        + '</div>'
        + '</div>'
        + '<div class="container">'
        + '<div class="row">'
        + '<div class="card mt-3">'
        + '<div class="card-body">'
        + '<div class="table-responsive">'
        + '<table class="table table-hover table-lg" id="dt">'
        + '<thead>'
        + '<tr>'
        + '<th>#</th>'
        + '<th>Username</th>'
        + '<th>Avatar</th>'
        + '<th>Wallet</th>'
        + '<th>Role</th>'
        + '<th>Actions</th>'
        + '</tr>'
        + '</thead>'
        + '<tbody id="item-product-dash">'
        + '</tbody>'
        + '</table>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>')
    GetUserDashboard() 
}
function GetUserDashboard() {
    $('#item-product-dash').empty()
    $.ajax({
        url: 'http://localhost:3000/Users',
        method: "GET",
        dataType: "JSON",
        success: function (data) {
            $.each(data, function (i, v) {
                $('#item-product-dash').append('<tr>'
                + '<td>'+ ++i +'</td>'
                + '<td>'+v.Username+'</td>'
                + '<td><img src="'+v.Avatar+'" alt=""></td>'
                + '<td>'+ConvertCurreny(v.Wallet,1)+'</td>'
                + '<td>'+v.Role+'</td>'
                + '<td><a data-toggle="modal" data-target="#modal-update-user" onclick="GetInfoToModal('+v.id+')"><i class="fas fa-pencil-alt mr-2"></i></a> <a><i class="far fa-trash-alt ml-2"></i></a></td>'
                + '</tr>')
            })
            $("#dt").DataTable()
        }
    })
}
function UploadImage(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#UM-avatar').attr('src', e.target.result)
        };
        reader.readAsDataURL(input.files[0])
    }
}
function GetFooter(){
    $('#footer-modal-user').empty()
    $('#footer-modal-user').append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>'
    +'<button type="button" class="btn btn-danger" onclick="UpdateProduct()">Update</button>')
}
function GetInfoToModal(id){
    EmptyInfoUser()
    GetFooter()
    $.ajax({
        url: 'http://localhost:3000/Users/' + id,
        method: "GET",
        dataType: "JSON",
        success: function (data) {
                $('#UM-name').val(data.Name)
                $('#UM-username').val(data.Username)
                $('#UM-password').val(data.Password)
                $('#UM-role').val(data.Role)
                $('#UM-email').val(data.Email)
                $('#UM-wallet').val(ConvertCurreny(data.Wallet,1))
                $('#UM-avatar').attr('src',data.Avatar)
        }
    })
}
function EmptyInfoUser(){
    $('#UM-name').val('')
    $('#UM-username').val('')
    $('#UM-password').val('')
    $('#UM-role').val(0)
    $('#UM-email').val('')
    $('#UM-wallet').val('')
    EmptyAvatarUser()
}
function EmptyAvatarUser(){
    $('#UM-avatar').removeAttr('src')
}
function UpdateUser(){
    
}