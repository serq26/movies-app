const overlaySX = {
  position: "fixed",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  zIndex: 2,
  backgroundImage:
    "radial-gradient(farthest-side at 73% 21%,transparent,#000000)",
};

const bgSX = {
  opacity: ".18",
  width: "100%",
};

const bgWrapperSX = {
  width: "100%",
  position: "fixed",
  zIndex: 0,
  left: 0,
  top: 0,
};

const contentSX = {
  position: "relative",
  alignSelf: "center",
  padding: { xs: "50px 0", md: "50px" },
  zIndex: 2,
};

const titleSX = {
  color: "#ffa726",
  fontWeight: "bold",
};

const posterSX = {
  maxWidth: "100%",
  borderRadius: "10px",
  position: "sticky",
  top: "4%",
  display: "block",
  margin: "0 auto",
};

const descriptionSX = {
  color: "#fff",
  marginY: 2,
  width: { xs: "100%", md: "60%" },
};

const trailerBtnSX = {
  display: "flex",
  alignItems: "center",
  color: "#fff",
  borderColor: "#fff",
  py: 1,
  px: 4,
  background: "rgba(255, 255, 255, 0.1)",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(3px)",
  webkitBackdropFilter: "blur(3px)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  margin: { xs: "10px auto", md: "16px 0" },
};

export { descriptionSX, trailerBtnSX, titleSX, bgSX, posterSX, contentSX, overlaySX, bgWrapperSX}