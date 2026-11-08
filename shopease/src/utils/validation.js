
export function validateCheckoutForm(form) {
  const errors = {};

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const cardRegex = /^\d{16}$/;

  const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;

  const cvvRegex = /^\d{3,4}$/;

  const zipRegex = /^\d{4,6}$/;

  // Validate customer information.
  if (!form.fullName.trim()) {
    errors.fullName = 'Full name is required';
  }

  if (!emailRegex.test(form.email)) {
    errors.email = 'Valid email is required';
  }

  if (!form.address.trim()) {
    errors.address = 'Address is required';
  }

  if (!form.city.trim()) {
    errors.city = 'City is required';
  }

  if (!zipRegex.test(form.zip)) {
    errors.zip = 'Valid Postal Code required (4-6 digits)';
  }

  // Validate demonstration payment fields.
  const normalizedCardNumber = form.cardNumber.replace(
    /\s/g,
    ''
  );

  if (!cardRegex.test(normalizedCardNumber)) {
    errors.cardNumber = 'Card number must be 16 digits';
  }

  if (!expiryRegex.test(form.cardExp)) {
    errors.cardExp = 'Expiry format MM/YY';
  }

  if (!cvvRegex.test(form.cardCvv)) {
    errors.cardCvv = '3 or 4 digit CVV';
  }

  return errors;
}

// Check whether the checkout form is valid.
export function isCheckoutFormValid(errors) {
  return Object.keys(errors).length === 0;
}
