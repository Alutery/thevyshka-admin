import cogoToast from 'cogo-toast';

const Toast = {
    pageLoadFailed() {
        cogoToast.error('Ошибка загрузки страницы', {position: 'bottom-right'});
    },
    customLoadFailed(message) {
        cogoToast.error(message, {position: 'bottom-right'});
    },
    customInfo(message) {
        cogoToast.info(message, {position: 'bottom-right'});
    },
    customSuccess(message) {
        cogoToast.success(message, {position: 'bottom-right'});
    }
}

export default Toast;