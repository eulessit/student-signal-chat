export default {
    data() {
        return {
            KeyHelper: libsignal.KeyHelper
        };
    },
    mounted() {
        console.log(this.KeyHelper);
    }
};
