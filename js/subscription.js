// ===== Subscription via Razorpay =====
function subscribe(plan) {
  const user = firebase.auth().currentUser;
  if (!user) return alert("Login required");

  // Amount in paise
  const amount = plan === "monthly" ? 19900 : plan === "yearly" ? 35500 : 69900;

  const options = {
    key: "YOUR_RAZORPAY_KEY", // Replace with your Razorpay key
    amount: amount,
    currency: "INR",
    name: "Taplynk Silent SOS",
    description: `${plan} subscription`,
    handler: function (response) {
      // Update Firestore subscription status
      firebase.firestore().collection("users")
        .doc(user.uid)
        .set({ subscription: plan, subscription_id: response.razorpay_payment_id }, { merge: true })
        .then(() => {
          alert(`Subscription successful!\nPlan: ${plan}`);
        })
        .catch(err => {
          alert("Failed to update subscription: " + err.message);
        });
    },
    prefill: {
      email: user.email,
      name: user.displayName || ""
    },
    theme: {
      color: "#22c55e"
    }
  };

  const rzp1 = new Razorpay(options);
  rzp1.open();
}