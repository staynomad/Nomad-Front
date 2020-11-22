const uploadPhoto = (file, token) => {
  const fileName = encodeURIComponent(file.name);
  const xhr = new XMLHttpRequest();
  const production = process.env.NODE_ENV === "production";
  const apiBaseUrl = production
    ? "https://vhomesback.herokuapp.com"
    : "http://localhost:8080";
  xhr.open(
    "GET",
    `${apiBaseUrl}/photos/sign-s3?file-name=${fileName}&file-type=${file.type}`
  );
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        uploadFile(file, response.signedReq, response.url, response, file.name);
      } else {
        alert("could not get signed url");
      }
    }
  };
  xhr.send();
};

const uploadFile = (file, signedRequest, url, fileName) => {
  const xhr = new XMLHttpRequest();
  xhr.open("PUT", signedRequest);
  //let updatedFileName = fileName + toString(Math.random() * 1000);
  file = new File([file], fileName, { type: file.type });
  xhr.setRequestHeader("Content-type", file.type);
  xhr.setRequestHeader("x-amz-acl", "public-read");

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        alert("file uploaded");
      } else {
        alert("could not upload file");
      }
    }
  };
  xhr.send(file);
};
export default uploadPhoto;
//token=${token}&
