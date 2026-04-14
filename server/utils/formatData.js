const formatData = (needs, users) => {

    const volunteers = users
        .filter(u => u.role === "volunteer")
        .map(v => ({
            id: v.id,
            name: v.name,
            skills: v.skills || [],
            location: v.location,
            availability: true // simplify for now
        }));

    const formattedNeeds = needs.map(n => {

        // count available volunteers in same location
        const availableVols = volunteers.filter(
            v => v.location === n.location && v.availability
        ).length;

        return {
            id: n.id,
            people: 5, // you don’t have this → default
            urgency: n.priority?.toUpperCase() || "MEDIUM",
            location: n.location,
            requiredSkills: n.skills || [],
            availableVolunteers: availableVols
        };
    });

    return {
        needs: formattedNeeds,
        volunteers
    };
};

export default formatData;