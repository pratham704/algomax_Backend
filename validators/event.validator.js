const validateEventData = ({ title, description, location, date, time, category, ticketPrice, totalTickets }) => {

    console.log(title, description, location, date, time, category, ticketPrice, totalTickets);
    if (!title || !description || !location || !date || !time || !category || !ticketPrice || !totalTickets) {
        return "All fields are required";
    }

    if (ticketPrice < 0) {
        return "Ticket price cannot be negative";
    }

    if (totalTickets < 1) {
        return "Total tickets must be at least 1";
    }

    const eventDate = new Date(date);
    if (eventDate < new Date()) {
        return "Event date cannot be in the past";
    }
    return null;
};

export default validateEventData;