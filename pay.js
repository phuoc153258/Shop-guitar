function GetBank() {
    $('#get-bank').empty()
    $.ajax({
        url: 'http://localhost:3000/Bank',
        method: "GET",
        dataType: "JSON",
        success: function (data) {
            $.each(data, function (i, v) {
                $('#get-bank').append('<div class="col-4">'
                    + '<div class="card mb-3 bank" style="max-width: 18rem;" id="' + v.id + '" onclick="SetIdBank(' + v.id + ')">'
                    + '<div class="card-header" id="bank' + v.id + '">' + v.name + '</div>'
                    + '<div class="card-body d-flex">'
                    + '<img src="' + v.image + '" class="img-pay" alt="">'
                    + '<b>1.000.000VNĐ</b>'
                    + '</div>'
                    + '</div>'
                    + '</div>'
                )
            })
        }
    })
}
GetBank()
function SetIdBank(id) {
    $('#id-bank').empty()
    $('#id-bank').val(id)
    $('.card-header').removeClass("active1");
    $('#bank'+id).addClass("active1"); 
}
function AddMoney() {
    let idBank = $('#id-bank').val()
    let session = $('#get-session').val()
    if(idBank!=0){
        $.ajax({
            url: 'http://localhost:3000/Users/'+session,
            method: "GET",
            dataType: "JSON",
            success: function (data) {
                let userobj = {}
                let money = Number(data.Wallet)
                money =  money +1000000
                userobj.Wallet = money
                userobj.Name = data.Name
                userobj.Username =data.Username
                userobj.Password = data.Password
                userobj.Email = data.Email
                userobj.Avatar = data.Avatar
                userobj.Role = data.Role
                $.ajax({
                    url: 'http://localhost:3000/Users/'+session,
                    method: "PUT",
                    dataType: "JSON",
                    contentType: "application/JSON",
                    data: JSON.stringify(userobj),
                    success: function (data2) {
                        $.ajax({
                            url: 'http://localhost:3000/Recharge',
                            method: "GET",
                            dataType: "JSON",
                            success: function (data3) {
                                $.each(data3, function (i, v) {
                                    if(data2.id==v.UserID){
                                        let rechargeobj= {}
                                        let temp = {}
                                        rechargeobj.UserID = v.UserID
                                        rechargeobj.History= v.History
                                        var today = new Date();
                                        var date = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
                                        temp.Date = date
                                        temp.Money = 1000000
                                        temp.BankID = idBank
                                        temp.Name = "Recharge"+ RandomName()
                                        temp.id = Number(v.History.length+1)
                                        rechargeobj.History.push(temp)
                                        $.ajax({
                                            url: 'http://localhost:3000/Recharge/'+session,
                                            method: "PUT",
                                            dataType: "JSON",
                                            contentType: "application/JSON",
                                            data: JSON.stringify(rechargeobj),
                                            success: function (data2) {
                                                swal({
                                                    title: "Success",
                                                    buttons: ["OK!", "Go to Profile!"],
                                                        icon: "data:image/png;base64,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",
                                                })
                                                    .then((willDelete) => {
                                                        if (willDelete) {
                                                            window.location.href = "profile.html";
                                                        }
                                                        else GetNavBar()
                                                    });
                                            }
                                        })

                                    }
                                })

                            }
                        })
                    }
                })
            }
        })
    }
    else{
        swal({
            text: "You have not selected a bank!",
            icon: "warning",
            button: "OK!",
          });
    }
}