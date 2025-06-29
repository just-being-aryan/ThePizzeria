import { Button, TextField } from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import styles from "../styles/Contact.module.css";

const Contact = () => {
  return (
    <div className={styles.contactform}>
      <div className={styles.container2}>
        <div className={styles.container2_contactText}>
          <h1 className={styles.container2_h1}>Contact Us</h1>
          <p className={styles.container2_p}>
            We value your feedback and inquiries. If you have any questions,
            concerns, or feedback, please don&rsquo;t hesitate to contact us.
            Our dedicated team is ready to assist you and provide the
            information you need. Whether it&rsquo;s through phone, email, live
            chat, social media, or visiting our office, we&rsquo;re here to
            ensure your experience with us is exceptional. Your satisfaction is
            important to us, and we look forward to hearing from you.
          </p>
        </div>
        <div className={styles.contactImg}>
          <img
            src="https://unblast.com/wp-content/uploads/2020/09/Contact-Us-Vector-Illustration-Part-02-1.jpg"
            alt=""
            height="500"
            width="600"
          />
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.contactDetails}>
          <h2 className={styles.container_h2}>
            Fill up the form and our team will get back to <br /> you within 24
            hours
          </h2>
          <div className={styles.contactDetailsInfo}>
            <p className={styles.contactDetailsInfo_p}>
              <LocalPhoneIcon /> +91 9999999999
            </p>
            <p className={styles.contactDetailsInfo_p}>
              <EmailIcon /> justbeingaryan@gmail.com
            </p>
            <p className={styles.contactDetailsInfo_p}>
              <LocationOnIcon /> Dublin, Ireland
            </p>
          </div>
        </div>
        <form className={styles.contactformForm} action="">
          <div className={styles.contactformFormdiv}>
            <TextField
              id="standard-basic"
              label="First Name"
              variant="standard"
              required
            />
            <TextField
              id="standard-basic"
              label="Last Name"
              variant="standard"
              required
            />
          </div>
          <div className={styles.contactformFormdiv}>
            <TextField
              id="standard-basic"
              label="Email"
              type="email"
              variant="standard"
              required
            />
            <TextField
              id="standard-basic"
              label="Phone"
              type="number"
              variant="standard"
              required
            />
          </div>
          <div className={styles.contactformFormdiv}>
            <TextField
              id="standard-basic"
              label="Message"
              variant="standard"
              required
            />
          </div>
          <Button variant="contained" type="submit">
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
