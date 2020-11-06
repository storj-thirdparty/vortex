<style>
.upload-area {
	height: 200px;
	background: white;
	border-radius: 5px;

	text-align: center;
	padding-top: 10px;
	border: 5px dashed #aaa;

	margin-bottom: 25px;
}
</style>

<template>
<div class="home">
	<div class="text-center mb-4">
		<button class="btn btn-lg btn-primary btn-block" type="submit">Upload</button>
	</div>

	<div v-cloak @drop.prevent="addFile" @dragover.prevent class="upload-area">
		Upload area

	</div>

	<table class="table">
		<thead>
			<tr>
				<th scope="col">File</th>
				<th scope="col">Size</th>
				<th scope="col">Upload Date</th>
				<th scope="col">Actions</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="file in files">
				<td>{{file.Key}}</td>
                <td>{{file.Size}}</td>
                <td>{{file.LastModified.toLocaleString()}}</td>
                <td><button class="btn btn-primary">Download</button></td>
			</tr>
		</tbody>
	</table>
</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import s3Credentials from '../../.s3-credentials.js';

const s3 = new AWS.S3(s3Credentials);

export default {
	name: 'Home',
    data: () => ({
        files: []
    }),
	methods: {
		addFile(e) {
			let [file] = e.dataTransfer.files;

			const params = {
				Bucket: 'caleb',
				Key: file.name,
				Body: file
			};

			s3.putObject(params, (err, data) => {
				if (err)
					console.log(err)
				else
					console.log("Successfully uploaded data");

                this.listFiles();
			});

		},

        listFiles() {
            s3.listObjects({
                Bucket: 'caleb',
            }, (err, list) => {
                console.log(list.Contents);
                this.files = list.Contents.sort((a, b) => a.Key < b.Key);
            });

        }
	},
    created() {
        this.listFiles();
    },
	components: {
		HelloWorld
	}
}
</script>
