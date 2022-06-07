import {React, useState, useEffect} from 'react'
import './createProgram.css'

const CreateProgram = () => {
  const [program, setProgram] = useState([{ weeks: [{ days: [{ exercises: [] }] }] }])
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  const handleAddBlock = () => {
    if (program.length < 32) {
      const newProgram = program.slice()
      newProgram.push({ weeks: [{ days: [{ exercises: [] }] }] })
      setProgram(newProgram)
    }
  }

  const handleAddBlockCopy = (i) => {
    if (program.length < 32) {
      const newProgram = program.slice()
      newProgram.push({ weeks: program[i].weeks.slice() })
      setProgram(newProgram)
    }
  }

  const handleRemoveBlock = (i) => {
    if (program.length > 1) {
      const newProgram = program.slice()
      newProgram.splice(i, 1)
      setProgram(newProgram)
    }
  }

  const handleAddWeek = (i) => {
    if (program[i].weeks.length < 52) {
      const newProgram = program.slice()
      newProgram[i].weeks.push({ days: [{ exercises: [] }] })
      setProgram(newProgram)
    }
  }

  const handleAddWeekCopy = (i, j) => {
    if (program[i].weeks.length < 52) {
      const newProgram = program.slice()
      newProgram[i].weeks.push({ days: program[i].weeks[j].days.slice() })
      setProgram(newProgram)
    }
  }

  const handleRemoveWeek = (i, j) => {
    if (program[i].weeks.length > 1) {
      const newProgram = program.slice()
      newProgram[i].weeks.splice(j, 1)
      setProgram(newProgram)
    }
  }

  const handleAddDay = (i, j) => {
    if (program[i].weeks[j].days.length < 32) {
      const newProgram = program.slice()
      newProgram[i].weeks[j].days.push({ exercises: [] })
      setProgram(newProgram)
    }
  }

  const handleAddDayCopy = (i, j, k) => {
    if (program[i].weeks[j].days.length < 32) {
      const newProgram = program.slice()
      newProgram[i].weeks[j].days.push({ exercises: program[i].weeks[j].days[k].exercises.slice() })
      setProgram(newProgram)
    }
  }

  const handleRemoveDay = (i, j, k) => {
    if (program[i].weeks[j].days.length > 1) {
      const newProgram = program.slice()
      newProgram[i].weeks[j].days.splice(k, 1)
      setProgram(newProgram)
    }
  }

  const handleAddExercise = (i, j, k) => {
    if (program[i].weeks[j].days[k].exercises.length < 64) {
      const newProgram = program.slice()
      newProgram[i].weeks[j].days[k].exercises.push({ sets: [] })
      setProgram(newProgram)
    }
  }

  const handleRemoveExercise = (i, j, k, l) => {
    if (program[i].weeks[j].days[k].exercises.length > 0) {
      const newProgram = program.slice()
      newProgram[i].weeks[j].days[k].exercises.splice(l, 1)
      setProgram(newProgram)
    }
  }

  const handleAddSet = (i, j, k, l) => {
    if (program[i].weeks[j].days[k].exercises.length < 32) {
      const newProgram = program.slice()
      newProgram[i].weeks[j].days[k].exercises[l].sets.push(5)
      setProgram(newProgram)
    }
  }

  return (
    <form>
      {/*data && <>{data}</>*/}
      <label htmlFor='program-name'>Program name:</label>
      <input type='text' name='program-name'></input>
      <ul>
        {program.map((block, i) => (<li key={`block-${i}`}>
          <div>
            <>Block {i + 1}</>
            <button type='button' onClick={() => handleAddBlockCopy(i)}>Add copy</button>
            <button type='button' onClick={() => handleRemoveBlock(i)}>Remove block</button>
          </div>
          <ul>
            {block.weeks.map((week, j) => <li key={`week-${i}-${j}`}>
              <div>
                <>Week {j + 1}</>
                <button type='button' onClick={() => handleAddWeekCopy(i, j)}>Add copy</button>
                <button type='button' onClick={() => handleRemoveWeek(i, j)}>Remove week</button>
              </div>
              <button type='button' onClick={() => handleAddDay(i, j)}>Add new day</button>
              <ul>
                {week.days.map((day, k) => <li key={`day-${i}-${j}-${k}`}>
                  <div>
                    <>Day {k + 1}</>
                    <button type='button' onClick={() => handleAddDayCopy(i, j, k)}>Add copy</button>
                    <button type='button' onClick={() => handleRemoveDay(i, j, k)}>Remove day</button>  
                  </div>
                  <div>
                    <input type='text'></input>
                    <button type='button' onClick={() => handleAddExercise(i, j, k)}>Add new exercise</button>
                  </div>
                  <ul>
                    {day.exercises.map((exercise, l) => <li key={`exercise-${i}-${j}-${k}-${l}`}>
                      <div>
                        <>Exercise {l + 1}</>
                        <button type='button' onClick={() => handleRemoveExercise(i, j, k, l)}>Remove exercise</button>
                      </div>
                      <div>
                        <label htmlFor='reps'>Reps:</label>
                        <input type='number' name='reps' min='0'></input>
                        <button type='button' onClick={() => handleAddSet(i, j, k, l)}>Add set</button>
                        <ul>
                          {exercise.sets.map((set, m) => <li key={`set-${i}-${j}-${k}-${l}-${m}`}>
                            <div>Set {m + 1}: {set} reps</div>
                          </li>)}
                        </ul>
                      </div>
                    </li>)}
                  </ul>
                </li>)}
              </ul>
            </li>)}
          </ul>
          <button type='button' onClick={() => handleAddWeek(i)}>Add new week</button>
        </li>))}
      </ul>
      <div>
        <button type='button' onClick={handleAddBlock}>Add new block</button>
      </div>
      <input type="submit" value="Submit"></input>
    </form>
  )
}

export default CreateProgram