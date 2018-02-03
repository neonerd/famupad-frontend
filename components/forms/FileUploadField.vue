<template lang="pug">
  .file-upload-field(
    @click="startFileSelection",
    ref="fileForm",
    :class="{dragover: isDragover}",
    @dragover.stop.prevent="startDrag",
    @dragenter.stop.prevent="startDrag",
    @dragleave.stop.prevent="endDrag",
    @dragend.stop.prevent="endDrag",
    @drop.stop.prevent="droppedFile"
  )
    // System
    input(type="file", ref="fileInput", @change="handleFile", v-show="false")
    template(v-if="!hasUploaded")
      | Nahrát soubor
    template(v-else)
      | Nahrán soubor {{ uploadedFilename }}
</template>

<script>
import {uploadFile} from '@/api'

export default {
  data () {
    return {
      isUploading: false,
      isDragover: false,
      hasUploaded: false,
      uploadedFilename: ''
    }
  },
  methods: {
    startDrag (e) {
      this.isDragover = true
    },
    endDrag (e) {
      this.isDragover = false
    },
    droppedFile (e) {
      this.isDragover = false
      // this.startFileUpload(e.dataTransfer.files[0])
    },
    startFileSelection () {
      this.$refs.fileInput.click()
    },
    handleFile () {
      this.startFileUpload(this.$refs.fileInput.files[0])
    },
    startFileUpload (file) {
      this.isUploading = true
      const data = new FormData()
      data.append('file', file)

      uploadFile(data)
        .then(responseData => {
          this.hasUploaded = true
          this.isUploading = false
          this.uploadedFilename = responseData.data.fileName
          this.fileUploaded({
            fileHash: responseData.data.fileHash,
            fileName: file.name
          })
        })
    },
    fileUploaded (fileData) {
      this.$emit('input', fileData)
    }
  }
}
</script>

<style lang="scss" scoped>
.file-upload-field {
  display: block;

  border: 1px solid #000000;
  padding: 20px;

  margin: 0 auto;
  width: 400px;
  text-align: center;

  &.dragover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.1);
  }
}
</style>