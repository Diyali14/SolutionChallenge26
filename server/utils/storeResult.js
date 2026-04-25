// import { db } from "../firebaseAdmin.js";

// const storeResults = async (optimizedNeeds) => {
//     const batch = db.batch();

//     for (const item of optimizedNeeds) {
//         const needId = item.need.id;

//         // Update need priorityScore
//         const needRef = db.collection("needs").doc(needId);

//         batch.update(needRef, {
//             status: "ongoing",
//             priorityScore: item.priorityScore
//         });

//         // Store assignments
//         item.matchedVolunteers.forEach(match => {
//             const ref = db.collection("assignments").doc();

//             batch.set(ref, {
//                 needId,
//                 volunteerId: match.volunteer.id,
//                 matchScore: match.matchScore
//             });
//         });
//     }

//     await batch.commit();
// };

// export default storeResults;

import { db } from "../firebaseAdmin.js";

const storeResults = async (optimizedNeeds, uid) => {
    const batch = db.batch();

    for (const item of optimizedNeeds) {
        const needId = item.need.id;

        // Update need status
        const needRef = db.collection("needs").doc(needId);
        batch.update(needRef, {
            status: "ongoing",
            priorityScore: item.priorityScore
        });

        // Find match for current user
        const match = item.matchedVolunteers?.find(
            v => v.volunteer.id === uid
        );

        // ALWAYS create ref BEFORE using it
        const ref = db.collection("assignments").doc();

        // Safe matchScore handling
        const matchScore = match ? match.matchScore : 1;

        // Single clean write
        batch.set(ref, {
            needId,
            volunteerId: uid,
            matchScore,
            createdAt: new Date()
        });
    }

    await batch.commit();
};

export default storeResults;