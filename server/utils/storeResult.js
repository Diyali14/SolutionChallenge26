const storeResults = async (optimizedNeeds) => {
    const batch = db.batch();

    for (const item of optimizedNeeds) {
        const needId = item.need.id;

        // Update need priorityScore
        const needRef = db.collection("needs").doc(needId);

        batch.update(needRef, {
            priorityScore: item.priorityScore
        });

        // Store assignments
        item.matchedVolunteers.forEach(match => {
            const ref = db.collection("assignments").doc();

            batch.set(ref, {
                needId,
                volunteerId: match.volunteer.id,
                matchScore: match.matchScore
            });
        });
    }

    await batch.commit();
};

export default storeResults;