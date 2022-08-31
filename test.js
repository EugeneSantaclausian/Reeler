const pay = async () => {
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      appId: "20ff1ee5-db8d-35d8-41f0-bc7bc9026179",
    },
  };

  axios
    .post(
      "https://reeler.herokuapp.com/api/movies/test-payment",
      {
        requestId: "37c99dfa-3afb-4127-b280-0078a1b28d2d",
        appReference: "bargainmoto",
        secret: "Bargain1Moto",
      },
      axiosConfig
    )
    .then((response) => {
      console.log(response);
    });
};
