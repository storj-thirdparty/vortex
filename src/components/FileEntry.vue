<style>
.action {
	margin-right: 0.5rem;
}
</style>

<template>
<tr scope="row">
	<td>{{filename}}</td>
	<td>{{size}}</td>
	<td>{{uploadDate}}</td>
	<td>
		<button v-on:click="$emit('download')" class="btn btn-sm btn-outline-primary action">
			<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-cloud-download" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
				<path fill-rule="evenodd"
				 d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z" />
				<path fill-rule="evenodd" d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z" />
			</svg>
		</button>
		<button v-on:click="share" class="btn btn-sm btn-outline-success action">
			<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-share" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
				<path fill-rule="evenodd"
				 d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
			</svg>

			{{shareText}}
		</button>
	</td>
</tr>
</template>

<script>
import prettyBytes from 'pretty-bytes';

export default {
	props: [
		'file',
	],
	data: () => ({
		shareText: ''
	}),
	computed: {
		filename() {
			return this.file.Key.length > 25 ? this.file.Key.slice(0, 25) + '...' : this.file.Key;
		},
		size() {
			return prettyBytes(this.file.Size);
		},
		uploadDate() {
			return this.file.LastModified.toLocaleString().split(',')[0];
		}
	},
	methods: {
		async share() {
			this.$emit('share');

			const url = this.$store.state.s3.getSignedUrl('getObject', {
				Bucket: this.$store.state.stargateBucket,
				Key: this.file.Key
			});

			navigator.clipboard.readText().then(text => outputElem.innerText = text);

			await navigator.permissions.query({
				name: "clipboard-write"
			});
			await navigator.clipboard.writeText(url);

			this.shareText = "Text copied!";
			await new Promise(resolve => setTimeout(resolve, 5000));
			this.shareText = "";
		}
	}
}
</script>
