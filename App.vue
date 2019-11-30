<script>
	export default {
		onLaunch: function() {
		    this.$store.dispatch('initData')
		},
		onShow: function() {
		},
		onHide: function() {
		}
	}
</script>

<style lang="scss">
    @import "colorui/main.css";
    @import "colorui/icon.css";
	/*每个页面公共css */
    @import "common/style/basicsComponentsStyle.scss";
    @import "common/style/myStyle.scss";

    body,html{
        font-size: 16px;
    }

</style>
