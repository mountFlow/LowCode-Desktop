<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
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
