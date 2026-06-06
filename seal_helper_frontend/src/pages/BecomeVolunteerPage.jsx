import React, { useState } from "react";
import {
    Container, Typography, TextField, Button, Box, Paper,
    MenuItem, FormGroup, FormControlLabel, Checkbox,
    FormControl, FormLabel, FormHelperText, Alert, Snackbar
} from "@mui/material";
import api_instance from "../services/api.js";

const CITIES = [
    "Київ", "Львів", "Одеса", "Дніпро", "Харків",
    "Запоріжжя", "Івано-Франківськ", "Вінниця", "Інше"
];

const HELP_AREAS = [
    "Допомога тваринам на місцях (фізичні роботи)",
    "Контент-менеджмент (написання статей, обробка фото)",
    "Соціальні мережі (поділ контенту, комунікація)",
    "Координація заходів та екскурсій",
    "Маркетинг та просування",
    "IT та веб-розробка",
    "Правова та адміністративна допомога",
    "Інше"
];

const AVAILABILITY_OPTIONS = ["1-2 год", "3-5 год", "5-10 год", "10+ год"];

function BecomeVolunteerPage() {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "+380",
        city: "",
        areas_of_help: [],
        motivation: "",
        availability: "",
        additional_info: "",
        consent_data_processing: false
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);

    // Dynamic Validation
    const validate = () => {
        let tempErrors = {};

        if (!formData.first_name) tempErrors.first_name = "Обов'язкове поле";
        if (!formData.last_name) tempErrors.last_name = "Обов'язкове поле";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email || !emailRegex.test(formData.email)) {
            tempErrors.email = "Введіть коректний Email";
        }

        const phoneRegex = /^\+380\d{9}$/;
        if (!formData.phone || !phoneRegex.test(formData.phone)) {
            tempErrors.phone = "Формат: +380XXXXXXXXX";
        }

        if (!formData.city) tempErrors.city = "Оберіть місто";

        if (formData.areas_of_help.length === 0) {
            tempErrors.areas_of_help = "Оберіть хоча б один напрямок";
        }

        if (!formData.availability) tempErrors.availability = "Оберіть час";
        if (!formData.consent_data_processing) tempErrors.consent_data_processing = "Потрібна згода";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleCheckboxArrayChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prev) => {
            const currentAreas = prev.areas_of_help;
            if (checked) {
                return { ...prev, areas_of_help: [...currentAreas, value] };
            } else {
                return { ...prev, areas_of_help: currentAreas.filter((area) => area !== value) };
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            setIsSubmitting(true);
            try {
                await api_instance.post('help/become-volunteer/', formData);
                setSuccessMessage(true);
                // Reset Form
                setFormData({
                    first_name: "", last_name: "", email: "", phone: "+380", city: "",
                    areas_of_help: [], motivation: "", availability: "", additional_info: "",
                    consent_data_processing: false
                });

                console.log('Success')
            } catch (error) {
                console.error("Submission failed", error);
                alert("Сталася помилка при відправці. Спробуйте пізніше.");
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 3, md: 5 },
                    borderRadius: 3,
                    backgroundColor: '#ffffff',
                    border: '1px solid #e0e0e0'
                }}
            >
                <Box sx={{ mb: 4, textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: '#000000' }}>
                        Долучайтеся до порятунку!
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#000000' }}>
                        Заповніть форму нижче, щоб стати волонтером проєкту Seal Helper.
                    </Typography>
                </Box>

                <form onSubmit={handleSubmit}>
                    {/* ПЕРСОНАЛЬНІ ДАНІ */}
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#000000' }}>Персональні дані</Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3, mb: 4 }}>
                        <TextField
                            label="Ім'я" name="first_name"
                            value={formData.first_name} onChange={handleChange}
                            error={!!errors.first_name} helperText={errors.first_name}
                            fullWidth required
                        />
                        <TextField
                            label="Прізвище" name="last_name"
                            value={formData.last_name} onChange={handleChange}
                            error={!!errors.last_name} helperText={errors.last_name}
                            fullWidth required
                        />
                        <TextField
                            label="Email" name="email" type="email"
                            value={formData.email} onChange={handleChange}
                            error={!!errors.email} helperText={errors.email}
                            fullWidth required
                        />
                        <TextField
                            label="Телефон" name="phone"
                            value={formData.phone} onChange={handleChange}
                            error={!!errors.phone} helperText={errors.phone}
                            fullWidth required
                        />
                        <TextField
                            select label="Місто/Регіон" name="city"
                            value={formData.city} onChange={handleChange}
                            error={!!errors.city} helperText={errors.city}
                            fullWidth required
                        >
                            {CITIES.map((city) => (
                                <MenuItem key={city} value={city}>{city}</MenuItem>
                            ))}
                        </TextField>
                    </Box>

                    {/* ІНФОРМАЦІЯ ПРО ВОЛОНТЕРСТВО */}
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#000000' }}>Інформація про волонтерство</Typography>

                    <FormControl error={!!errors.areas_of_help} sx={{ mb: 3 }} required component="fieldset">
                        <FormLabel sx={{ color: '#000000', mb: 1, '&.Mui-focused': { color: '#000000' } }}>
                            Напрямок допомоги
                        </FormLabel>
                        <FormGroup>
                            {HELP_AREAS.map((area) => (
                                <FormControlLabel
                                    key={area}
                                    sx={{ '& .MuiTypography-root': { color: '#000000' } }}
                                    control={
                                        <Checkbox
                                            value={area}
                                            checked={formData.areas_of_help.includes(area)}
                                            onChange={handleCheckboxArrayChange}
                                            sx={{ color: '#000000', '&.Mui-checked': { color: '#000000' } }}
                                        />
                                    }
                                    label={area}
                                />
                            ))}
                        </FormGroup>
                        {errors.areas_of_help && <FormHelperText sx={{ color: 'error.main' }}>{errors.areas_of_help}</FormHelperText>}
                    </FormControl>

                    <Box sx={{ mb: 4 }}>
                        <TextField
                            label="Чому ви хочете стати волонтером?" name="motivation"
                            value={formData.motivation} onChange={handleChange}
                            multiline rows={4} fullWidth required
                            placeholder="Опишіть вашу мотивацію..."
                        />
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <TextField
                            select label="Скільки часу ви можете виокремити на тиждень?" name="availability"
                            value={formData.availability} onChange={handleChange}
                            error={!!errors.availability} helperText={errors.availability}
                            fullWidth required
                        >
                            {AVAILABILITY_OPTIONS.map((opt) => (
                                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                            ))}
                        </TextField>
                    </Box>

                    {/* ДОДАТКОВА ІНФОРМАЦІЯ */}
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#000000' }}>Додаткова інформація</Typography>
                    <Box sx={{ mb: 4 }}>
                        <TextField
                            label="Інша важлива інформація (необов'язково)" name="additional_info"
                            value={formData.additional_info} onChange={handleChange}
                            multiline rows={3} fullWidth
                        />
                    </Box>

                    {/* ЗГОДА */}
                    <FormControl error={!!errors.consent_data_processing} sx={{ mb: 3 }} required>
                        <FormControlLabel
                            sx={{ '& .MuiTypography-root': { color: '#000000' } }}
                            control={
                                <Checkbox
                                    name="consent_data_processing"
                                    checked={formData.consent_data_processing}
                                    onChange={handleChange}
                                    sx={{ color: '#000000', '&.Mui-checked': { color: '#000000' } }}
                                />
                            }
                            label="Я даю згоду на обробку моїх персональних даних"
                        />
                        {errors.consent_data_processing && <FormHelperText sx={{ color: 'error.main' }}>{errors.consent_data_processing}</FormHelperText>}
                    </FormControl>

                    {/* SUBMIT BUTTON */}
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        disabled={isSubmitting || !formData.consent_data_processing} // Updated Condition
                        sx={{
                            py: 1.5,
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            backgroundColor: '#000000',
                            color: '#ffffff',
                            '&:hover': { backgroundColor: '#333333' },
                            // Add specific styling for the disabled state to look greyed out
                            '&.Mui-disabled': {
                                backgroundColor: '#e0e0e0',
                                color: '#9e9e9e'
                            }
                        }}
                    >
                        {isSubmitting ? "Відправка..." : "Відправити заявку"}
                    </Button>
                </form>
            </Paper>

            {/* SUCCESS SNACKBAR */}
            <Snackbar open={successMessage} autoHideDuration={6000} onClose={() => setSuccessMessage(false)}>
                <Alert onClose={() => setSuccessMessage(false)} severity="success" sx={{ width: '100%' }}>
                    Дякуємо! Вашу заявку успішно надіслано.
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default BecomeVolunteerPage;