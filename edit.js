function findbyid() {
    let view = document.getElementById('data');
    let idobj = document.getElementById('inputid');
    let idn = idobj.elements[0].value;
    let url = 'http://localhost:8080/2018CWS1/webresources/mhs.mahasiswa';
    let nurl = url + '/' + idn;
    $.ajax({
        url: nurl,
        method: 'GET',
        dataType: 'xml',
        success: function (resp) {
            if (resp != null) {
                let id = resp.getElementsByTagName("id")[0].childNodes[0].nodeValue;
                let nama = resp.getElementsByTagName("nama")[0].childNodes[0].nodeValue;
                let nim = resp.getElementsByTagName("nim")[0].childNodes[0].nodeValue;
                view.innerHTML = id + '-' + nama + '=' + nim;
            }
            else { view.innerHTML = 'tidak ada data'; }
        },
        fail: function (e) { }
    })
}

function deletebyid() {
    let view = document.getElementById('delete');
    let idobj = document.getElementById('inputid');
    let idn = idobj.elements[0].value;
    let url = 'http://localhost:8080/2018CWS1/webresources/mhs.mahasiswa';
    let nurl = url + '/' + idn;
    $.ajax({
        url: nurl,
        method: 'DELETE',
        dataType: 'xml',
        success: function (resp) {
            view.innerHTML = idn + ' deleted';
        },
        fail: function (e) {
            view.innerHTML = 'failed';
        }
    })

}

function showalldata() {
    let view = document.getElementById('show');
    let urls = "http://localhost:8080/2018CWS1/webresources/mhs.mahasiswa";

    $.ajax({
        url: urls,
        method: 'GET',
        success: function (xml) {
            console.log(xml);
            let table = xml2html(xml);
            view.innerHTML = table;
        },
        fail: function (e) { alert('error'); }
    })
    //view.innerHTML = "Show here";
}

function xml2html(xml) {
    let sdata = xml.getElementsByTagName('mahasiswa').length;
    let table = "<table border='1'>";
    table += '<tr> <th>ID</th> <th>NAMA</th> <th>NIM</th> </tr>'
    for (row = 0; row < sdata; row++) {
        let id = xml.getElementsByTagName("id")[row].childNodes[0].nodeValue;
        let nama = xml.getElementsByTagName("nama")[row].childNodes[0].nodeValue;
        let nim = xml.getElementsByTagName("nim")[row].childNodes[0].nodeValue;
        table += '<tr> <td>' + id + '</td> <td>' + nama + '</td> <td>' + nim + '</td></tr>'
    }
    table += "</table>";
    return table;

}

function createdata() {
    let view = document.getElementById('data');
    let idobj = document.getElementById('inputid');
    let ids = idobj.elements[0].value;
    let namas = idobj.elements[1].value;
    let nims = idobj.elements[2].value;
    let url = 'http://localhost:8080/2018CWS1/webresources/mhs.mahasiswa';
    let passvar =
        '<mahasiswa>' +
        '<id>' + ids + '</id>' +
        '<nama>' + namas + '</nama>' +
        '<nim>' + nims + '</nim>' +
        '</mahasiswa>';

    $.ajax({
        url: url,
        method: 'POST',
        contentType: 'application/xml',
        data: passvar,
        success: function (resp) {
            view.innerHTML = ids + ' added';
        },
        fail: function (e) {
            view.innerHTML = 'added failed';
        }
    })
}

function findforupdate() {
    let id = document.getElementById('id').value;
    findforedit(id);
}

function findforedit(id) {
    let url = 'http://localhost:8080/2018CWS1/webresources/mhs.mahasiswa';
    let nurl = url + '/' + id;
    $.ajax({
        url: nurl,
        method: 'GET',
        dataType: 'xml',
        success: function (resp) {
            if (resp != null) {
                let id = resp.getElementsByTagName("id")[0].childNodes[0].nodeValue;
                let nama = resp.getElementsByTagName("nama")[0].childNodes[0].nodeValue;
                let nim = resp.getElementsByTagName("nim")[0].childNodes[0].nodeValue;
                document.getElementById("nid").value = id;
                document.getElementById("nname").value = nama;
                document.getElementById("nnim").value = nim;
                //view.innerHTML = id + '-' + nama + '=' + nim;
            }
            else { view.innerHTML = 'tidak ada data'; }
        },
        fail: function (e) { }
    })
}
function updatedata() {
    let view = document.getElementById('data');
    let idobj = document.getElementById('inputid');
    let ids = idobj.elements[0].value;
    let namas = idobj.elements[1].value;
    let nims = idobj.elements[2].value;
    let url = 'http://localhost:8080/2018CWS1/webresources/mhs.mahasiswa/';
    let passvar =
        '<mahasiswa>' +
        '<id>' + ids + '</id>' +
        '<nama>' + namas + '</nama>' +
        '<nim>' + nims + '</nim>' +
        '</mahasiswa>';
    url += ids;
    $.ajax({
        url: url,
        method: 'PUT',
        contentType: 'application/xml',
        data: passvar,
        success: function (resp) {
            view.innerHTML = 'id: ' + ids + ' updated';
        },
        fail: function (e) {
            view.innerHTML = 'update failed';
        }
    })

}