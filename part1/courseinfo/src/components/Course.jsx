import Header from "./Header.jsx"
import Total from "./Total.jsx"
import Content from "./Content.jsx"

const Course = ({ courses }) => {

    return (
        <div>
            {
                courses.map((course) => (
                    <>
                        <Header key={course.id} course={course.name} />
                        <Content parts={course.parts} />
                        <Total total={course.parts.reduce((p, c) => p + c.exercises, 0)} />
                    </>
                ))
            }

        </div>
    )
}

export default Course