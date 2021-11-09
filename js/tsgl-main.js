$(function() {
    //发起ajax请求获取图书列表
    function getBookList() {
        $.get('http://www.liulongbin.top:3006/api/getbooks', function(res) {
            //2.获取图书列表是否成功    
            if (res.status !== 200) return alert('获取图书失败');
            //3.渲染页面结构
            var rows = [];
            $.each(res.data, function(i, item) { //循环拼接字符串
                rows.push('<tr> <td > ' + item.id + ' </td> <td > ' + item.bookname + ' </td> <td > ' + item.author + ' </td> <td > ' + item.publisher + '</td><td><a href="javascript:;" class = "del" data-id = ' + item.id + '>删除</a></td> </tr >')
            })
            $('#tb').empty().append(rows.join('')); //渲染表格结构,.empty()可以清空匹配元素的内容
        })
    }
    getBookList();

    $('tbody').on('click', '.del', function() {
        var id = $(this).attr('data-id');
        $.get('http://www.liulongbin.top:3006/api/delbook', { id: id }, function(res) {
            if (res.status !== 200) { return alert('删除图书失败') }
            getBookList();
        })

    })

    $('#btnAdd').on('click', function() {
        var bookname = $('#iptBookname').val()
        var author = $('#iptAuthor').val()
        var publisher = $('#iptPublisher').val()
        if (bookname === '' || author === '' || publisher === '') {
            alert('请将图书信息填写完整')
        }
        $.ajax({
            type: 'POST',
            url: 'http://www.liulongbin.top:3006/api/addbook',
            data: { bookname: bookname, author: author, publisher: publisher },
            success: function(res) {
                if (res.status !== 201) return alert('添加图书失败')
                getBookList();
                $('input:text').val('')
            }
        })


    })

})





/* $(function() {
    // 获取图书列表数据
    function getBookList() {
        $.get('http://www.liulongbin.top:3006/api/getbooks', function(res) {
            if (res.status !== 200) return alert('获取数据失败！')

            var rows = []
            $.each(res.data, function(i, item) {
                rows.push('<tr><td>' + item.id + '</td><td>' + item.bookname + '</td><td>' + item.author + '</td><td>' + item.publisher + '</td><td><a href="javascript:;" class="del" data-id="' + item.id + '">删除</a></td></tr>')
            })
            $('#tb').empty().append(rows.join(''))
        })
    }

    getBookList()

    

    // 通过代理的方式为动态添加的元素绑定点击事件
    $('tbody').on('click', '.del', function() {
        var id = $(this).attr('data-id')
        $.get('http://www.liulongbin.top:3006/api/delbook', {
            id: id
        }, function(res) {
            if (res.status !== 200) return alert('删除图书失败！')
            getBookList()
        })
    })

    $('#btnAdd').on('click', function() {
        var bookname = $('#iptBookname').val().trim()
        var author = $('#iptAuthor').val().trim()
        var publisher = $('#iptPublisher').val().trim()
        if (bookname.length <= 0 || author.length <= 0 || publisher.length <= 0) {
            return alert('请填写完整的图书信息！')
        }

        $.post('http://www.liulongbin.top:3006/api/addbook', {
            bookname: bookname,
            author: author,
            publisher: publisher
        }, function(res) {
            if (res.status !== 201) return alert('添加图书失败！')
            getBookList()
            $('#iptBookname').val('')
            $('#iptAuthor').val('')
            $('#iptPublisher').val('')
        })
    })
}) */