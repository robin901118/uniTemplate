<template>
	<label>
		<input type="text" :name="inputName">
	</label>
</template>

<script>
	export default {
		behaviors:['wx://form-field'],
		props:{
			inputName:{
				type:String,
				required:true
			}
		}
	}
</script>
