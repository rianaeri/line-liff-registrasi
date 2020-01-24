function loadDaftar() {
    if (localStorage.list_data && localStorage.id) {
        list_data = JSON.parse(localStorage.getItem('list_data'));
        var data_app = "";
        if (list_data.length > 0) {
            data_app = '<table class="table table-striped table-dark">';
            data_app += '<thead>' +
                '<th>ID</th>' +
                '<th>Nama</th>' +
                '<th>Email</th>' +
                '<th>Agama</th>' +
				'<th>JenisKelamin</th>' +
				'<th>Biografi</th>' +
                '<th>Hapus Biografi</th>' +
                '<th>Lihat Biografi</th>' +
                '<th>Edit Biografi</th>' +
                '</thead> <tbody>';

            for (i in list_data) {
                data_app += '<tr>';
                data_app +=
                    '<td>' + list_data[i].id + ' </td>' +
                    '<td>' + list_data[i].nama + ' </td>' +
                    '<td>' + list_data[i].email + ' </td>' +
					'<td>' + list_data[i].agama + ' </td>' +
					'<td>' + list_data[i].jeniskelamin + ' </td>' +
                    '<td>' + list_data[i].biografi + ' </td>' +
                    '<td><a class="btn btn-danger btn-small" href="javascript:void(0)" onclick="hapusData(\'' + list_data[i].id + '\')">Hapus</a></td>' +
                    '<td><a class="btn btn-danger btn-small" href="javascript:void(0)" onclick="lihatData(\'' + list_data[i].id + '\')">Lihat</a></td>' +
                    '<td><a class="btn btn-warning btn-small" href="javascript:void(0)" onclick="editData(\'' + list_data[i].id + '\')">Edit</a></td>';
                data_app += '</tr>';
            }

            data_app += '</tbody></table>';

        }
        else {
            data_app = "Pendaftaran Masih Kosong";
        }


        $('#list-daftar').html(data_app);
        $('#list-daftar').hide();
        $('#list-daftar').fadeIn(100);
    }
}

function editDaftar(id) {

    if (localStorage.list_data && localStorage.id) {
        list_data = JSON.parse(localStorage.getItem('list_data'));
        idx_data = 0;
        for (i in list_data) {
            if (list_data[i].id == id) {
                $("#eid").val(list_data[i].id);
                $("#enama").val(list_data[i].nama);
                $("#eemail").val(list_data[i].email);
                $("#eagama").val(list_data[i].agama);
				$("#ejeniskelamin").val(list_data[i].jeniskelamin);
				$("#ebiografi").val(list_data[i].biografi);
                list_data.splice(idx_data, 1);
            }
            idx_data++;
        }
        gantiMenu('edit-daftar');

    }

}

function lihatDaftar(id) {
    if (localStorage.list_data && localStorage.id) {
        list_data = JSON.parse(localStorage.getItem('list_data'));
        idx_data = 0;
        for (i in list_data) {
            if (list_data[i].id == id) {
                $("#lid").val(list_data[i].id);
                $("#lnama").val(list_data[i].nama);
                $("#lemail").val(list_data[i].email);
                $("#lagama").val(list_data[i].agama);
				$("#ljeniskelamin").val(list_data[i].jeniskelamin);
				$("#lbiografi").val(list_data[i].biografi);
                list_data.splice(idx_data, 1);
            }
            idx_data++;
        }
        gantiMenu('lihat-daftar');

    }
}


function simpanDaftar() {

    if (!liff.isInClient()) {
        sendAlertIfNotInClient();
    } else {
        liff.sendMessages([{
            'type': 'text',
            'text': "Pendaftaran baru berhasil disimpan"
        }]).then(function() {
            alert('Pendaftaran Tersimpan');
        }).catch(function(error) {
            alert('Error ...');
        });
    }

    nama = $('#nama').val();
    email = $('#email').val();
    agama = $('#agama').val();
	jeniskelamin = $('#jeniskelamin').val();
	biografi = $('#biografi').val();

    if (localStorage.list_data && localStorage.id) {
        list_data = JSON.parse(localStorage.getItem('list_data'));
        id = parseInt(localStorage.getItem('id'));
    }
    else {
        list_data = [];
        id = 0;
    }

    id++;
    list_data.push({ 'id': id, 'nama': nama, 'email': email, 'agama': agama, 'jeniskelamin': jeniskelamin, 'biografi': biografi });
    localStorage.setItem('list_data', JSON.stringify(list_data));
    localStorage.setItem('id', id);
    document.getElementById('form-data').reset();
    gantiMenu('list-daftar');

    return false;
}

function simpanEditData() {

    if (!liff.isInClient()) {
        sendAlertIfNotInClient();
    } else {
        liff.sendMessages([{
            'type': 'text',
            'text': "Pendaftaran yang diedit sudah tersimpan"
        }]).then(function() {
            alert('Pendaftaran tersimpan');
        }).catch(function(error) {
            alert('Error ...');
        });
    }

    id = $('#eid').val();
    nama = $('#enama').val();
    email = $('#eemail').val();
    agama = $('#eagama').val();
	jeniskelamin = $('#ejeniskelamin').val();
	biografi = $('#ebiografi').val();

    list_data.push({ 'id': id, 'nama': nama, 'email': email, 'agama': agama, 'jeniskelamin': jeniskelamin, 'biografi': biografi });
    localStorage.setItem('list_data', JSON.stringify(list_data));
    document.getElementById('eform-data').reset();
    gantiMenu('list-daftar');

    return false;
}

function hapusData(id) {

    if (!liff.isInClient()) {
        sendAlertIfNotInClient();
    } else {
        liff.sendMessages([{
            'type': 'text',
            'text': "Pendaftaran sudah terhapus"
        }]).then(function() {
            alert('Pendaftaran sudah dihapus');
        }).catch(function(error) {
            alert('Error');
        });
    }

    if (localStorage.list_data && localStorage.id) {
        list_data = JSON.parse(localStorage.getItem('list_data'));

        idx_data = 0;
        for (i in list_data) {
            if (list_data[i].id == id) {
                list_data.splice(idx_data, 1);
            }
            idx_data++;
        }

        localStorage.setItem('list_data', JSON.stringify(list_data));
        loadCatatan();
    }
}


function gantiMenu(menu) {
    if (menu == "list-daftar") {
        loadDaftar();
        $('#tambah-daftar').hide();
        $('#list-daftar').fadeIn();
        $('#edit-daftar').hide();
        $('#lihat-daftar').hide();
    }
    else if (menu == "tambah-daftar") {
        $('#tambah-daftar').fadeIn();
        $('#list-daftar').hide();
        $('#edit-daftar').hide();
        $('#lihat-daftar').hide();
    } else if (menu == "edit-daftar") {
        $('#edit-daftar').fadeIn();
        $('#tambah-daftar').hide();
        $('#list-daftar').hide();
        $('#lihat-daftar').hide();
    } else if (menu == "lihat-daftar") {
        $('#lihat-daftar').fadeIn();
        $('#edit-daftar').hide();
        $('#tambah-daftar').hide();
        $('#list-daftar ').hide();
    }
}