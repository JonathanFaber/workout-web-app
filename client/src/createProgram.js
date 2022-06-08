import { React, useState } from 'react'
import './createProgram.css'

const CreateProgram = () => {
  const [program, setProgram] = useState([{ 
    name: 'Block 1', 
    weeks: [{ days: [{ exercises: [], nextExerciseName: '' }] }] 
  }])
  
  /* Get Data from backend
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);*/

  const handleNameBlock = (e, i) => {
    const newProgram = program.slice()
    newProgram[i].name = e.target.value
    setProgram(newProgram)
  }

  const handleAddBlock = () => {
    if (program.length < 32) {
      const newProgram = program.slice()
      newProgram.push({ 
        name: `Block ${program.length + 1}`, 
        weeks: [{ days: [{ exercises: [], nextExerciseName: '' }] }] 
      })
      setProgram(newProgram)
    }
  }

  const handleAddBlockCopy = (i) => {
    if (program.length < 32) {
      const newProgram = program.slice()
      newProgram.push({ 
        name: `Block ${program.length + 1}`,
        weeks: program[i].weeks.slice() 
      })
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
      newProgram[i].weeks.push({ days: [{ exercises: [], nextExerciseName: '' }] })
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
      newProgram[i].weeks[j].days.push({ exercises: [], nextExerciseName: '' })
      setProgram(newProgram)
    }
  }

  const handleAddDayCopy = (i, j, k) => {
    if (program[i].weeks[j].days.length < 32) {
      const newProgram = program.slice()
      newProgram[i].weeks[j].days.push({ 
        exercises: program[i].weeks[j].days[k].exercises.slice(), 
        nextExerciseName: '' })
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

  const handleNameNewExercise = (e, i, j, k) => {
    const newProgram = program.slice()
    newProgram[i].weeks[j].days[k].nextExerciseName = e.target.value
    setProgram(newProgram)
  }

  const handleNameExercise = (e, i, j, k, l) => {
    const newProgram = program.slice()
      newProgram[i].weeks[j].days[k].exercises[l].name = e.target.value
      setProgram(newProgram)
  }

  const handleAddExercise = (i, j, k) => {
    if (program[i].weeks[j].days[k].exercises.length < 32) {
      const name = program[i].weeks[j].days[k].nextExerciseName
      const newProgram = program.slice()
      newProgram[i].weeks[j].days[k].exercises.push({ name, sets: [], nextReps: 1 })
      newProgram[i].weeks[j].days[k].nextExerciseName = ''
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

  const handleNewSetReps = (e, i, j, k, l) => {
    const newProgram = program.slice()
    newProgram[i].weeks[j].days[k].exercises[l].nextReps = e.target.value
    setProgram(newProgram)
  }

  const handleAddSet = (i, j, k, l) => {
    if (program[i].weeks[j].days[k].exercises[l].sets.length < 32) {
      const reps = program[i].weeks[j].days[k].exercises[l].nextReps
      const newProgram = program.slice()
      newProgram[i].weeks[j].days[k].exercises[l].sets.push(reps)
      setProgram(newProgram)
    }
  }

  const handleChangeSet = (e, i, j, k, l, m) => {
    const newProgram = program.slice()
    newProgram[i].weeks[j].days[k].exercises[l].sets[m] = e.target.value
    setProgram(newProgram)
  }

  const handleRemoveSet = (i, j, k, l, m) => {
    if (program[i].weeks[j].days[k].exercises[l].sets.length > 0) {
      const newProgram = program.slice()
      newProgram[i].weeks[j].days[k].exercises[l].sets.splice(m, 1)
      setProgram(newProgram)
    }
  }

  return (
    <form>
      {/*data && <>{data}</>*/}
      <label htmlFor='program-name'>Program name: </label>
      <input type='text' name='program-name'></input>

      <ul>
        {program.map((block, i) => (<li key={`block-${i}`}>
          <div>
            <input defaultValue={`Block ${i + 1}`} value={block.name} onInput={(e) => handleNameBlock(e, i)}></input>
            <button type='button' onClick={() => handleAddBlockCopy(i)}>Add copy</button>
            {program.length > 1 && 
              <button type='button' onClick={() => handleRemoveBlock(i)}>Remove block</button>}
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
                    <input type='text' value={day.nextExerciseName} onInput={(e) => handleNameNewExercise(e, i, j, k)}></input>
                    <button type='button' onClick={() => handleAddExercise(i, j, k)}>Add new exercise</button>
                  </div>

                  <ul>
                    {day.exercises.map((exercise, l) => <li key={`exercise-${i}-${j}-${k}-${l}`}>
                      <div>
                        <input value={exercise.name} onInput={(e) => handleNameExercise(e, i, j, k, l)}></input>
                        <button type='button' onClick={() => handleRemoveExercise(i, j, k, l)}>Remove exercise</button>
                      </div>
                      <div>
                        <label htmlFor='reps'>Reps:</label>
                        <input type='number' name='reps' min='0' onChange={(e) => handleNewSetReps(e, i, j, k, l)}></input>
                        <button type='button' onClick={() => handleAddSet(i, j, k, l)}>Add set</button>
                        
                        <ul>
                          {exercise.sets.map((set, m) => <li key={`set-${i}-${j}-${k}-${l}-${m}`}>
                            <div>Set {m + 1}: 
                              <input value={set} onInput={(e) => handleChangeSet(e, i, j, k, l, m)}></input> reps
                              <button type='button' onClick={() => handleRemoveSet(i, j, k, l, m)}>Remove set</button>
                            </div>
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