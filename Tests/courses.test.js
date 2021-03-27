
const db= require('../models');
const app = require('../server')
const supertest = require('supertest')
const request = supertest(app)

// describe('GET /course', function() {
// it('should respond with the names of the three first courses',  async () => {
//     const response = await request.get('/course')
//     expect(response.status).toBe(200);    
//     expect (response.body.data[0].name).toEqual("Yoga");
//     expect (response.body.data[1].name).toEqual("Gymnastique");
//     expect (response.body.data[2].name).toEqual("Cheerleading");
//   })
// });

// describe('POST /course', function() {
//   it('should respond with the newly created course',  async () => {
//       const newCourse={
//         name: "Nouvelle discipline",
//         description: "Lorem ipsum",
//         image_path: "https://cdn.pixabay.com/photo/2020/12/13/16/21/stork-5828727_960_720.jpg"
//       }
//       const response = await request.post("/course/new").send(newCourse)
//       expect(response.status).toBe(200);
//       expect (response.body.data).toHaveProperty("id");
//       expect (response.body.data.name).toEqual("Nouvelle discipline");
//       expect (response.body.data.description).toEqual("Lorem ipsum");
//       expect (response.body.data.image_path).toEqual("https://cdn.pixabay.com/photo/2020/12/13/16/21/stork-5828727_960_720.jpg");
//   })
// });

// describe('PUT /course', function() {
//     it('should respond with the updated course',  async () => {
//         const course=await db.Course.create({
//           name: "AquaPoney",
//           description: "Lorem ipsum",
//           image_path: "https://cdn.pixabay.com/photo/2020/12/13/16/21/stork-5828727_960_720.jpg"
//         })

//         const modifiedCourse={
//             name: "AquaVélo",
//           description: "Lorem ipsum",
//           image_path: "https://cdn.pixabay.com/photo/2020/12/13/16/21/stork-5828727_960_720.jpg"
//         }
     
//         const response = await request.put("/course/"+course.id).send(modifiedCourse);
//         const checkedCourse= await db.Course.findOne({where:{id:course.id}})
//         expect(response.status).toBe(200);
//         expect (checkedCourse.name).toEqual(modifiedCourse.name);
//       expect (checkedCourse.description).toEqual(modifiedCourse.description);
//       expect (checkedCourse.image_path).toEqual(modifiedCourse.image_path)
        
//     })
//   });

  describe('DELETE /course', function() {
    it('should delete the animal and should not be able to find him afterward',  async () => {
        const course=await db.Course.create({
          name: "AquaPoney",
          description: "Lorem ipsum",
          image_path: "https://cdn.pixabay.com/photo/2020/12/13/16/21/stork-5828727_960_720.jpg"
        })

        const response = await request.delete("/course/"+course.id);
        expect(response.status).toBe(200);

        const NoCourseHere= await db.Course.findByPk(course.id);
        expect(NoCourseHere).toBe(null)
        
    })
  });
  
