import notie from 'notie'

export default {
    wrap: (err) => {
        notie.alert({
            type: 'error',
            text: 'Произошла ошибка <button class="btn btn-primary" onclick="window.location.reload()"><i class="fa fa-refresh" ></i></button>',
            stay: true,
        })
        console.log(err);
    }
}