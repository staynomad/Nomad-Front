const getSignedURL = (file, fileName, bucket, setLoading) => {
  let response = null;
  const xhr = new XMLHttpRequest();
  const production = process.env.NODE_ENV === "production";
  const apiBaseUrl = production
    ? "https://nvestup.com"
    : "http://localhost:8080";
  xhr.open(
    "GET",
    `${apiBaseUrl}/photos/sign-s3?file-name=${fileName}&file-type=${file.type}&file-bucket=${bucket}`
  );
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        response = JSON.parse(xhr.responseText);
        uploadFile(
          file,
          response.signedReq,
          response.url,
          file.name,
          setLoading
        );
      } else {
        alert("Could not get signed url. Please refresh and try again");
      }
    }
  };
  xhr.send();
}; //uploadFile(file, response.signedReq, response.url, response, file.name);

const uploadFile = (file, signedRequest, url, fileName, setLoading) => {
  const xhr = new XMLHttpRequest();
  xhr.open("PUT", signedRequest);
  file = new File([file], fileName, { type: file.type });
  xhr.setRequestHeader("Content-type", file.type);
  xhr.setRequestHeader("x-amz-acl", "public-read");
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        setLoading();
      } else {
        alert("could not upload file");
      }
    }
  };
  xhr.send(file);
};

export { getSignedURL, uploadFile };
