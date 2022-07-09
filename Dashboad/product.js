let arrProduct = []
let arrBrand = []
function ProductManagement() {
    $('#nav-list').empty()
    $('#nav-list').append('<li class="nav-item active mt-1 mb-1">'
        + '<a class="nav-link" onclick="ProductManagement()">'
        + '<i class="fas fa-guitars my-color-white"></i>'
        + '<span class="menu-title ml-3">Products Management</span>'
        + '</a>'
        + '</li>'
        + '<li class="nav-item nav-hover mt-1 mb-1">'
        + '<a class="nav-link" data-toggle="collapse" href="#form-elements" aria-expanded="false"'
        + 'aria-controls="form-elements" onclick="UsersManagement()">'
        + '<i class="fas fa-users w-14"></i>'
        + '<span class="menu-title ml-3">Users Management</span>'
        + '</a>'
        + '</li>')
    DashboadBodyProduct()
}
function DashboadBodyProduct() {
    $('#body-dashboad').empty()
    $('#body-dashboad').append('<div class="row">'
        + '<div class="col-sm-6">'
        + '<h4 class="card-title">Products Management</h4>'
        + '</div>'
        + '<div class="col-sm-6 d-flex justify-content-end">'
        + '<a class="btn btn-danger my-color-white" data-toggle="modal" data-target="#modal-update-product" onclick="DisplayFooterCreate()">New Product</a>'
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
        + '<th>Name</th>'
        + '<th>Images</th>'
        + '<th>Price</th>'
        + '<th>Brand</th>'
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
    GetProductToTable()
    GetBrand()
}
ProductManagement()
function GetProductToTable() {
    $('#item-product-dash').empty()
    $.ajax({
        url: 'http://localhost:3000/Guitars',
        method: "GET",
        dataType: "JSON",
        success: function (data) {
            $.each(data, function (i, v) {
                arrProduct.push(v)
                $('#item-product-dash').append('<tr>'
                    + '<td>' + ++i + '</td>'
                    + '<td>' + v.Name + '</td>'
                    + '<td><img src="' + v.Images[0] + '" alt=""></td>'
                    + '<td>' + ConvertCurreny(v.Price, 1) + '</td>'
                    + '<td>' + v.Brand.Name + '</td>'
                    + '<td><a onclick="ModalGetProduct(' + v.id + ')" data-toggle="modal" data-target="#modal-update-product"><i class="fas fa-pencil-alt mr-2"></i></a> <a onclick="DeleteProduct(' + v.id + ')"><i class="far fa-trash-alt ml-2"></i></a></td>'
                    + '</tr>')
            })
            $("#dt").DataTable()
        }
    })
}
function ConvertCurreny(money, value) {
    let x = +money * +value;
    return x = x.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
}
function GetBrand() {
    $.ajax({
        url: 'http://localhost:3000/Brands',
        method: "GET",
        dataType: "JSON",
        success: function (data) {
            $.each(data, function (i, v) {
                arrBrand.push(v)
            })
        }
    })
}
function GetBrandModal() {
    $('#modal-brand').empty()
    $.ajax({
        url: 'http://localhost:3000/Brands',
        method: "GET",
        dataType: "JSON",
        success: function (data) {
            $.each(data, function (i, v) {
                $('#modal-brand').append('<option value="' + v.id + '">' + v.Name + '</option>')
            })
        }
    })
}
GetBrandModal()
function DisplayGuitarTable(data, index) {
    $('#item-product-dash').append('<tr>'
        + '<td>' + index + '</td>'
        + '<td>' + data.Name + '</td>'
        + '<td><img src="' + data.Images[0] + '" alt=""></td>'
        + '<td>' + ConvertCurreny(data.Price, 1) + '</td>'
        + '<td>' + data.Brand.Name + '</td>'
        + '<td><i class="fas fa-pencil-alt mr-2"></i><i class="far fa-trash-alt ml-2"></i></td>'
        + '</tr>')
}
function ModalGetProduct(id) {
    DisplayFooterUpdate()
    EmptyModalProduct()
    $('#id-product-input').empty()
    $('#id-product-input').val(Number(id))
    $.ajax({
        url: 'http://localhost:3000/Guitars/' + id,
        method: "GET",
        dataType: "JSON",
        success: function (data) {
            $('#modal-img-1').attr('src', data.Images[0])
            $('#modal-img-2').attr('src', data.Images[1])
            $('#modal-img-3').attr('src', data.Images[2])
            $('#modal-img-4').attr('src', data.Images[3])
            $('#modal-name').val(data.Name)
            $('#modal-price').val(data.Price)
            $('#modal-brand').val(data.Brand.id)
            $('#modal-origin').val(data.Origin)
            $('#modal-bs').val(data.BodyShape)
            $('#modal-tr').val(data.TrussRod)
            $('#modal-top').val(data.Top)
            $('#modal-slide').val(data.Slide)
            $('#modal-back').val(data.Back)
            $('#modal-neck').val(data.Neck)
            $('#modal-header-product').text(data.Name)
            GetImageModalToUpload()
        }
    })
}
function EmptyModalProduct() {
    $('#modal-name').val(null)
    $('#modal-price').val(null)
    $('#modal-origin').val(null)
    $('#modal-brand').val(null)
    $('#modal-bs').val(null)
    $('#modal-tr').val(null)
    $('#modal-top').val(null)
    $('#modal-slide').val(null)
    $('#modal-back').val(null)
    $('#modal-neck').val(null)
    $('#modal-header-product').empty()
    EmptyModalImage()
    EmptyImageModalUpload()
}
function EmptyModalImage() {
    $('#modal-img-1').removeAttr('src')
    $('#modal-img-2').removeAttr('src')
    $('#modal-img-3').removeAttr('src')
    $('#modal-img-4').removeAttr('src')
}
function UploadImage(input, i) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#change-img' + i).attr('src', e.target.result)
        };
        reader.readAsDataURL(input.files[0])
    }
}
function GetImageModalToUpload() {
    EmptyImageModalUpload()
    $('#change-img1').attr('src', $('#modal-img-1').attr('src'))
    $('#change-img2').attr('src', $('#modal-img-2').attr('src'))
    $('#change-img3').attr('src', $('#modal-img-3').attr('src'))
    $('#change-img4').attr('src', $('#modal-img-4').attr('src'))
}
function EmptyImageModalUpload() {
    $('#change-img1').removeAttr('src')
    $('#change-img2').removeAttr('src')
    $('#change-img3').removeAttr('src')
    $('#change-img4').removeAttr('src')
}
function GetInfoProduct() {
    let productObj = {}
    let image = []
    productObj.Images = image
    image.push($('#modal-img-1').attr('src'))
    image.push($('#modal-img-2').attr('src'))
    image.push($('#modal-img-3').attr('src'))
    image.push($('#modal-img-4').attr('src'))
    productObj.Name = $('#modal-name').val()
    productObj.Price = $('#modal-price').val()
    for (let index = 0; index < arrBrand.length; index++) {
        console.log($('#modal-brand').val())
        console.log(arrBrand[index].id)
        if (Number($('#modal-brand').val()) == arrBrand[index].id) {
            productObj.Brand = arrBrand[index]
        }
    }
    productObj.Origin = $('#modal-origin').val()
    productObj.BodyShape = $('#modal-bs').val()
    productObj.TrussRod = $('#modal-tr').val()
    productObj.Top = $('#modal-top').val()
    productObj.Slide = $('#modal-slide').val()
    productObj.Back = $('#modal-back').val()
    productObj.Neck = $('#modal-neck').val()
    return productObj
}
function LoadImageModal() {
    EmptyModalImage()
    $('#modal-img-1').attr('src', $('#change-img1').attr('src'))
    $('#modal-img-2').attr('src', $('#change-img2').attr('src'))
    $('#modal-img-3').attr('src', $('#change-img3').attr('src'))
    $('#modal-img-4').attr('src', $('#change-img4').attr('src'))
}
function UpdateProduct() {
    let info = GetInfoProduct()
        $.ajax({
            url: 'http://localhost:3000/Guitars/' + Number($('#id-product-input').val()),
            method: "PUT",
            dataType: "JSON",
            contentType: "application/JSON",
            data: JSON.stringify(info),
            success: function (data) {
                swal({
                    title: "Update Success!",
                    icon: "success",
                    button: "OK!",
                })
                    .then((value) => {
                        $('#modal-update-product').modal('hide');
                        GetProductToTable()
                    });
            }
        })
}
function DisplayFooterUpdate(){
    $('#footer-modal-product').empty()
    $('#footer-modal-product').append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>'
    +'<button type="button" class="btn btn-danger" onclick="UpdateProduct()">Update</button>')
}
function DisplayFooterCreate(){
    EmptyModalProduct()
    $('#footer-modal-product').empty()
    $('#footer-modal-product').append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>'
    +'<button type="button" class="btn btn-danger" onclick="CreateProduct()">Create</button>')
}
function DeleteProduct(id) {
    swal({
        title: "Delete?",
        buttons: ["Cancel", "Delete"],
        icon: "warning",
    })
        .then((willDelete) => {
            if (willDelete) {
                $.ajax({
                    url : 'http://localhost:3000/Guitars/'+id,
                    method : "DELETE",
                    dataType : "JSON",
                    success : function (data){
                        GetProductToTable()
                    }
                })
            }
        });
}
function CreateProduct(){
    let info = GetInfoProduct()
    if(info.Brand!=null){
        $.ajax({
            url: 'http://localhost:3000/Guitars',
            method: "POST",
            dataType: "JSON",
            contentType: "application/JSON",
            data: JSON.stringify(info),
            success: function (data) {
                swal({
                    title: "Create Success!",
                    icon: "success",
                    button: "OK!",
                    value: true
                })
                    .then((value) => {
                        $('#modal-update-product').modal('hide');
                        GetProductToTable()
                    });

            }
        })
    }
    else{
            swal({
                title: "Brand is not select!",
                icon: "warning",
                button: "OK!",
            });
    }
}

