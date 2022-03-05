import {
    Avatar,
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    Link,
    Paper,
    Stack,
    TextField,
    Typography
  } from "@mui/material";
  import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
  import { teal } from "@mui/material/colors";
  const Login = () => {
    return (
      <Grid>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            height: "70vh",
            width: "280px",
            m: "20px auto"
          }}
        >
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Avatar sx={{ bgcolor: teal[400] }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant={"h5"} sx={{ m: "30px" }}>
              Sign In
            </Typography>
          </Grid>
          <TextField label="Username" variant="standard" fullWidth required />
          <TextField
            type="password"
            label="Password"
            variant="standard"
            fullWidth
            required
          />
          {/* ラベルとチェックボックス */}
          {/* <FormControlLabel
            labelPlacement="end"
            label="パスワードを忘れました"
            control={<Checkbox name="checkboxA" size="small" color="primary" />}
          /> */}
          <Box mt={3}>
            <Button type="submit" color="primary" variant="contained" fullWidth>
              サインイン
            </Button>
  
            {/* <Typography variant="caption">
              <Link href="#">パスワードを忘れましたか？</Link>
            </Typography> */}
            <Typography variant="caption" display="block" sx={{ mt: "10px" }}>
              アカウントを持っていますか？
              <Link href="/register">アカウントを作成</Link>
            </Typography>
          </Box>
        </Paper>
      </Grid>
    );
  };

  export default Login;