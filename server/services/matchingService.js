import axios from "axios";

export const callSpringBoot = async (data) => {
    try {
        const res = await axios.post(
            "https://a-6nrr.onrender.com/optimize", // your Spring Boot endpoint
            data
        );
        return res.data;
    } catch (err) {
        console.error("Spring Boot Error:", err.message);
        throw err;
    }
};