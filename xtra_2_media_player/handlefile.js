const inputElement = document.getElementById('getMp3File')

inputElement.addEventListener('change', checkfiles)

function checkfiles() {
  const fileList = this.files
  console.log(fileList)
}