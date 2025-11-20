import {Elysia, t} from "elysia"
import {connect, model, Schema} from "mongoose";
import project from "./models/Project";
import certificate from "./models/Certificate";
import student from "./models/Student";
import work from "./models/Work";

const MONGODB_URI = process.env.MONGODB_URI || '';
const run = async () => {
    try {
        await connect(MONGODB_URI)
            .then(r => {
                const connectionInfo = r.connections[0];
                if (connectionInfo) {
                    console.log("Connected to " + connectionInfo.name);
                } else {
                    console.log("Connected to MongoDB, but no connection info available");
                }
            })
            .catch(e => {
                console.error("Failed to connect to MongoDB:", e);
            });
    } catch (error) {
        console.error("Unexpected error in run function:", error);
    }
}

run().catch(err => console.error(err));

console.log("MongoDB Connect")

const PORT = process.env.PORT || 3000;

const studentSchema = new Schema(student);
const projectSchema = new Schema(project);
const certificateSchema = new Schema(certificate);
const workSchema = new Schema(work);

const Student = model('Student', studentSchema);
const Project = model('Project', projectSchema);
const Certificate = model('Certificate', certificateSchema);
const Work = model('Work', workSchema);

const app = new Elysia();

// Student Routes
app.get('/students', async () => {
    try {
        const students = await Student.find();
        return {
            status: 200,
            body: students
        };
    } catch (error) {
        return {
            status: 500,
            body: {error: 'Internal server error'}
        };
    }
}).post('/students', async ({body}) => {
    try {
        const newStudent = await Student.create(body);
        return {
            status: 201,
            body: newStudent
        };
    } catch (error) {
        return {
            status: 500,
            body: {error: 'Failed to create student'}
        };
    }
}).put('/students/:id', async ({params: {id}, body}) => {
    try {
        const result = await Student.updateOne({_id: id}, body);
        return {
            status: 200,
            body: result
        };
    } catch (error) {
        return {
            status: 500,
            body: {error: 'Failed to update student'}
        };
    }
}, {
    params: t.Object({
        id: t.String()
    }),
    body: t.Object({
        // Define the expected shape of the student object here
        // For example:
        name: t.Optional(t.String()),
        email: t.Optional(t.String())
        // Add other student fields as needed
    })
}).delete('/students/:id', async ({params}) => {
    try {
        return await Student.deleteOne({_id: params.id});
    } catch (error) {
        throw new Error('Failed to delete student');
    }
}, {
    response: {
        200: t.Object({
            acknowledged: t.Boolean(),
            deletedCount: t.Number()
        }),
        500: t.Object({
            error: t.String()
        })
    }
})

// Project Routes
app.get('/projects', async () => {
    try {
        const projects = await Project.find();
        return {
            status: 200,
            body: projects
        };
    } catch (error) {
        return {
            status: 500,
            body: {error: 'Internal server error'}
        };
    }
}).post('/projects', async ({body}) => {
    try {
        const newProject = await Project.create(body);
        return {
            status: 201,
            body: newProject
        };
    } catch (error) {
        return {
            status: 500,
            body: {error: 'Failed to create Project'}
        };
    }
}).put('/projects/:id', async ({params: {id}, body}) => {
    try {
        const result = await Project.updateOne({_id: id}, body);
        return {
            status: 200,
            body: result
        };
    } catch (error) {
        return {
            status: 500,
            body: {error: 'Failed to update Project'}
        };
    }
}, {
    params: t.Object({
        id: t.String()
    }),
    body: t.Object({
        // Define the expected shape of the student object here
        // For example:
        name: t.Optional(t.String()),
        email: t.Optional(t.String())
        // Add other student fields as needed
    })
}).delete('/projects/:id', async ({params}) => {
    try {
        return await Project.deleteOne({_id: params.id});
    } catch (error) {
        throw new Error('Failed to delete Project');
    }
}, {
    response: {
        200: t.Object({
            acknowledged: t.Boolean(),
            deletedCount: t.Number()
        }),
        500: t.Object({
            error: t.String()
        })
    }
})

// Certificate Routes

app.get('/certificates', async () => {
    try {
        const certificate = await Certificate.find();
        return {
            status: 200,
            body: certificate
        };
    } catch (error) {
        return {
            status: 500,
            body: {error: 'Internal server error'}
        };
    }
}).post('/certificates', async ({body}) => {
    try {
        const newCertificate = await Certificate.create(body);
        return {
            status: 201,
            body: newCertificate
        };
    } catch (error) {
        return {
            status: 500,
            body: {error: 'Failed to create certificate'}
        };
    }
}).put('/certificates/:id', async ({params: {id}, body}) => {
    try {
        const result = await Certificate.updateOne({_id: id}, body);
        return {
            status: 200,
            body: result
        };
    } catch (error) {
        return {
            status: 500,
            body: {error: 'Failed to update certificate'}
        };
    }
}, {
    params: t.Object({
        id: t.String()
    }),
    body: t.Object({
        // Define the expected shape of the student object here
        // For example:
        name: t.Optional(t.String()),
        email: t.Optional(t.String())
        // Add other student fields as needed
    })
}).delete('/certificates/:id', async ({params}) => {
    try {
        return await Student.deleteOne({_id: params.id});
    } catch (error) {
        throw new Error('Failed to delete certificates');
    }
}, {
    response: {
        200: t.Object({
            acknowledged: t.Boolean(),
            deletedCount: t.Number()
        }),
        500: t.Object({
            error: t.String()
        })
    }
})

// Work Routes

app.get('/works', async () => {
    try {
        const works = await Work.find();
        return {
            status: 200,
            body: works
        };
    } catch (error) {
        return {
            status: 500,
            body: {error: 'Internal server error'}
        };
    }
}).post('/works', async ({body}) => {
    try {
        const newWorks = await Work.create(body);
        return {
            status: 201,
            body: newWorks
        };
    } catch (error) {
        return {
            status: 500,
            body: {error: 'Failed to create work'}
        };
    }
}).put('/works/:id', async ({params: {id}, body}) => {
    try {
        const result = await Work.updateOne({_id: id}, body);
        return {
            status: 200,
            body: result
        };
    } catch (error) {
        return {
            status: 500,
            body: {error: 'Failed to update work'}
        };
    }
}, {
    params: t.Object({
        id: t.String()
    }),
    body: t.Object({
        // Define the expected shape of the student object here
        // For example:
        name: t.Optional(t.String()),
        email: t.Optional(t.String())
        // Add other student fields as needed
    })
}).delete('/works/:id', async ({params}) => {
    try {
        return await Work.deleteOne({_id: params.id});
    } catch (error) {
        throw new Error('Failed to delete work');
    }
}, {
    response: {
        200: t.Object({
            acknowledged: t.Boolean(),
            deletedCount: t.Number()
        }),
        500: t.Object({
            error: t.String()
        })
    }
})

app.listen(PORT)

console.log("Server run on PORT: " + PORT)