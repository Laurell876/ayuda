import React, { useState } from "react";
import auth from "../auth/Auth";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "../index.css";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import CardMedia from "@material-ui/core/CardMedia";
import backgroundImage from "../images/question.jpg";
import { url } from "../constants";
import axios from "axios";
import Snackbar from "../components/Snackbar";

const useStyles = makeStyles({
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 20,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Login(props) {

  const [openAlert, setOpenAlert] = useState(false);
  const [authErrorMessage, setAuthErrorMessage] = useState("");

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const preventDefault = (event) => event.preventDefault();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    setOpenAlert(false)
    axios
      .post(url + "api/user/login", { email, password })
      .then((res) => {
        const accessToken = res.data.accessToken;
        const refreshToken = res.data.refreshToken;
        auth.login(
          () => {
            props.history.push("/home");
          },
          accessToken,
          refreshToken
        );
        //this.setState({ persons });
      })
      .catch((e) => {
        setAuthErrorMessage(e.response.data.message ? e.response.data.message : (e.response.data.details[0].message ? e.response.data.details[0].message : "An error has occurred"))
        setOpenAlert(true)
      });
  };

  return (
    <div className="container flex-column d-flex align-items-center justify-content-center">
      <Card style={{ minWidth: "40%" }} className="mt-4">
        <div>
          <CardMedia
            className="p-0 m-0"
            style={{ height: "180px" }}
            image={backgroundImage}
            title="Contemplative Reptile"
          />
          <div className="pl-3 pr-3 pb-3">
            <CardContent>
              <Typography variant="h2" gutterBottom>
                <p className="styledTitle">Ayuda</p>
              </Typography>
              <form className={classes.root} noValidate autoComplete="off">
                <div className="d-flex flex-column">
                  <TextField
                    className="mb-4"
                    id="outlined-basic"
                    label="Email Address"
                    variant="outlined"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <TextField
                    id="filled-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
              </form>
            </CardContent>

            <CardActions className="d-flex justify-content-center">
              <Button
                variant="contained"
                color="secondary"
                style={{ minWidth: "40%" }}
                onClick={login}
              >
                <Typography>Login</Typography>
              </Button>
            </CardActions>
          </div>
        </div>
      </Card>

      <Card className="mb-4 mt-3 p-2" style={{ minWidth: "40%" }}>
        <Typography variant="overline">Don't Have An Account?</Typography>
        <Link
          onClick={(e) => {
            props.history.push("/signup");
            preventDefault(e);
          }}
        >
          <Typography className="pl-1 link" variant="overline">
            Sign up!
          </Typography>
        </Link>
      </Card>
      {openAlert ? <Snackbar message={authErrorMessage} /> : null}
    </div>
  );
}
