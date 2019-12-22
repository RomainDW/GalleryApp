import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import * as ROUTES from "../../constants/routes";
import SignOutButton from "../SignOut";

const useStyles = makeStyles(theme => ({
  root: {
    "& > * + *": {
      marginLeft: theme.spacing(2)
    }
  }
}));

const LinkTo = React.forwardRef((props, ref) => (
  <RouterLink innerRef={ref} {...props} />
));

const Link2 = React.forwardRef((props, ref) => (
  <RouterLink innerRef={ref} to="/landing" {...props} />
));

export function LinksAuth() {
  const classes = useStyles();

  return (
    <Typography className={classes.root}>
      <Link component={Link2}>Landing</Link>
      <Link component={LinkTo} to={ROUTES.HOME}>
        Home
      </Link>
      <Link component={LinkTo} to={ROUTES.ACCOUNT}>
        Account
      </Link>
      <Link component={LinkTo} to={ROUTES.ADMIN}>
        Admin
      </Link>
      <SignOutButton />
    </Typography>
  );
}

export function LinksNonAuth() {
  const classes = useStyles();

  return (
    <Typography className={classes.root}>
      <Link component={LinkTo} to={ROUTES.LANDING}>
        Landing
      </Link>
      <Link component={LinkTo} to={ROUTES.SIGN_IN}>
        Sign In
      </Link>
    </Typography>
  );
}
