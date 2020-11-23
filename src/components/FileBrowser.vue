<style scoped>
.card {
	min-height: 500px;
}
.table-heading {
    color: #768394;
    border-top: 0;
    border-bottom: 1px solid #dee2e6;
		padding-left: 0;
}
.path {
	font-size: 18px;
	font-weight: 700;
}
</style>

<template>
	<div class="card border-0 p-4 p-lg-5 mb-5 mt-4"  @drop.prevent="$emit('uploadFile', $event)" @dragover.prevent>
		<p class="path mb-4">{{path}}</p>

		<table class="table">
			<thead>
				<tr>
					<th class="table-heading" scope="col">File</th>
					<th class="table-heading" scope="col">Size</th>
					<th class="table-heading" scope="col">Upload Date</th>
					<th class="table-heading" scope="col">Actions</th>
				</tr>
			</thead>
			<tbody>
				<!--<tr v-for="file in filesUploading">
					<td class="upload-text">{{file.Key}}</td>
					<td></td>
					<td></td>
					<td>
						<div class="spinner-border" role="status">
							<span class="sr-only">Loading...</span>
						</div>
					</td>
				</tr>-->

				<tr v-for="file in files">
					<td>{{file.Key}}</td>
					<td>{{file.Size | prettyBytes}}</td>
					<td>{{file.LastModified.toLocaleString()}}</td>
					<td><button v-on:click="downloadFile(file)" class="btn btn-primary">Download</button></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
export default {
	props: [
		'path',
		'files'
	]
}
</script>
