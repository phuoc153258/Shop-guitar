function Navbar() {
    $.ajax({
        url: 'http://localhost:3000/Session/1',
        method: "GET",
        dataType: "JSON",
        success: function (data) {
            $('#get-session').empty()
            $('#get-session').val(data.userid)
            $.ajax({
                url: ' http://localhost:3000/Users/' + data.userid,
                method: "GET",
                dataType: "JSON",
                success: function (data1) {
                    $('#admin-avatar').empty()
                    $('#admin-name').empty()
                    $('#admin-avatar').attr('src',data1.Avatar)
                    $('#admin-name').text(data1.Name)
                }
            })
        }
    })
}
Navbar()
function LogOut() {
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
            window.location.href = "../../index.html";
        }
    })
}