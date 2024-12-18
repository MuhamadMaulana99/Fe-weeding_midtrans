import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TextField, Button, MenuItem, Container, Grid } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import dayjs from "dayjs";
import moment from "moment";
import axios from "axios";
import { useRouter } from "next/navigation";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const packages = [
  "Before Wedding - Neubasic",
  "Before Wedding - Neusweat",
  "Traditional Sessions - Neubasic",
  "Traditional Sessions - Neusweat",
  "Pre wedding - Neubasic",
  "Pre wedding - Neusweat",
  "Wedding Intimate",
  "Wedding Day - Neusweat",
  "Wedding Day - Neudeluxe",
  "Photo Only",
  "Video Only",
];

const LandingPage = () => {
  moment.locale("id");
  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const [linkPayment, setLinkPayment] = React.useState({});
  const [formData, setFormData] = React.useState({
    nama: "",
    noTelp: "",
    email: "",
    paket: "",
    jamAcara: null,
    tanggalAcara: null,
    instagram: "",
    alamatAcara: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (newValue) => {
    setFormData({
      ...formData,
      tanggalAcara: newValue,
    });
  };
  const handleDateClockChange = (newValue) => {
    setFormData({
      ...formData,
      jamAcara: newValue,
    });
  };

  const body = {
    nama: formData?.nama,
    noTelp: formData?.noTelp,
    email: formData?.email, 
    paket: formData?.paket,
    jamAcara: formData.jamAcara,
    tanggalAcara: formData.tanggalAcara,
    instagram: formData?.instagram,
    alamatAcara: formData?.alamatAcara,
  };
  // const body = {
  //   nama: formData?.nama,
  //   noTelp: formData?.noTelp,
  //   email: formData?.email, // Include email in the body
  //   paket: formData?.paket,
  //   jamAcara: formData.jamAcara ? dayjs(formData.jamAcara).format("HH:mm") : "",
  //   tanggalAcara: moment(formData?.tanggalAcara).format("LL"),
  //   instagram: formData?.instagram,
  //   alamatAcara: formData?.alamatAcara,
  // };
  // console.log(body, "bodyy");
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman setelah submit

    try {
      // Kirim POST request ke API
      const response = await axios.post(
        "http://localhost:4000/midtrans",
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", response.data); // Melihat respons dari server
      // window.snap.pay(response.data.token);
      // console.log(first)
      window.snap.pay(response.data.token, {
        onSuccess: function(result) {
          console.log('Payment Success:', result);
        },
        onPending: function(result) {
          console.log('Payment Pending:', result);
        },
        onError: function(result) {
          console.error('Payment Error:', result);
        },
        onClose: function() {
          console.log('Payment popup closed');
        },
      });
      // window.snap.pay(requsetData.token);
      handleClose(); // Menutup dialog setelah berhasil menyimpan data
    } catch (error) {
      console.error("Error submitting the form:", error);
      // alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const generatePaymentLink = async (e) => {
    e.preventDefault(); 
    const secret = process.env.NEXT_PUBLIC_SECRET;
    const encodeSecret = Buffer.from(secret).toString('base64');
    const basicAuth = `Basic ${encodeSecret}`;
    // let bodyPayment = [body]

    try {
      const response = await axios.post(
        "http://localhost:4000/midtransPaymentLink",
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response server", response.data); 
      console.log("parameter", response.data.parameter); 

      const responses = await fetch(`${process.env.NEXT_PUBLIC_API}/v1/payment-links`, {
        method: 'POST',
        headers: {
          "Accept": 'application/json',
          "Content-Type": 'application/json',
          'Authorization': basicAuth
        },
        body: JSON.stringify(response.data.parameter)
      })
      const paymentLink = await responses.json()
      // console.log("ResponsePayment", paymentLink); 
      // setLinkPayment(paymentLink)
      // router.push(paymentLink?.payment_url)
      handleClose(); 
      window.open(paymentLink?.payment_url, '_blank')
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  // console.log(linkPayment, 'linkPayment')
  

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Form Booking Neumories</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Container className="mx-auto mt-8 p-4">
              <Grid container spacing={3}>
                {/* Nama */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Nama"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    variant="outlined"
                    className="shadow-lg"
                  />
                </Grid>

                {/* No Telp */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="No Telp"
                    name="noTelp"
                    value={formData.noTelp}
                    onChange={handleChange}
                    variant="outlined"
                    className="shadow-lg"
                  />
                </Grid>

                {/* Email */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    variant="outlined"
                    className="shadow-lg"
                    type="email"
                  />
                </Grid>

                {/* Paket yang Dipilih */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    select
                    label="Paket yang Dipilih"
                    name="paket"
                    value={formData.paket}
                    onChange={handleChange}
                    variant="outlined"
                    className="shadow-lg"
                  >
                    {packages.map((paket) => (
                      <MenuItem key={paket} value={paket}>
                        {paket}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* Jam Acara */}
                <Grid item xs={12} md={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileTimePicker
                      label="Jam Acara"
                      name="jamAcara"
                      value={formData.jamAcara}
                      onChange={handleDateClockChange}
                      renderInput={(params) => (
                        <TextField
                          fullWidth
                          {...params}
                          variant="outlined"
                          className="shadow-lg"
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>

                {/* Tanggal Acara */}
                <Grid item xs={12} md={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Tanggal Acara"
                      value={formData.tanggalAcara}
                      onChange={handleDateChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          variant="outlined"
                          className="shadow-lg"
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>

                {/* Instagram */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Instagram"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    variant="outlined"
                    className="shadow-lg"
                  />
                </Grid>

                {/* Alamat Acara */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Alamat Acara"
                    name="alamatAcara"
                    value={formData.alamatAcara}
                    onChange={handleChange}
                    variant="outlined"
                    multiline
                    rows={4}
                    className="shadow-lg"
                  />
                </Grid>
              </Grid>
            </Container>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={generatePaymentLink}>testPayment Link</Button> */}
          <Button onClick={handleClose} variant="contained">
            Close
          </Button>
          {/* <Button type="submit" variant="contained" onClick={handleSubmit}>
            Simpan
          </Button> */}
          <Button onClick={generatePaymentLink} variant="contained">Bayar</Button>
        </DialogActions>
      </Dialog>
      <div className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">
              Booking Neumories
            </h1>
            <p className="text-lg text-white">
              Capture your wedding moments with our professional photography
              services.
            </p>
          </header>

          {/* Main Section */}
          <section className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center lg:space-x-8">
              {/* Image */}
              <div className="lg:w-1/2">
                <img
                  src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
                  alt="Wedding photography"
                  className="rounded-lg shadow-lg"
                />
              </div>
              {/* Content */}
              <div className="lg:w-1/2 mt-8 lg:mt-0 text-center lg:text-left">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Capture Your Perfect Day
                </h2>
                <p className="text-gray-600 mb-6">
                  With Neumories, your wedding photography is in the hands of
                  professional photographers who know how to turn every moment
                  into a timeless memory.
                </p>
                {/* Call to Action */}
                <Button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300"
                  variant="contained"
                  onClick={handleClickOpen}
                >
                  Daftar Sekarang
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
