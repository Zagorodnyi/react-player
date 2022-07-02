let attached = false;
export const listenToSpaceBar = (cb: any) => {
  if (attached) return;
  attached = true;
  console.log("listen");
  document.body.addEventListener("keyup", function (e) {
    console.log('data')
    if (e.code === "Space") {
      cb?.();
    }
  });
};
