const { useState } = React;

const App = () => {
  const [parentMode, setParentMode] = useState(false);
  const [diaryEntry, setDiaryEntry] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [posts, setPosts] = useState([]);
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Read 10 pages', points: 50, completed: false },
    { id: 2, title: 'Draw something fun', points: 30, completed: false },
  ]);
  const [lang, setLang] = useState('zh'); // Default to Chinese

  const moods = ['😊', '😢', '😍', '😣', '🥳'];

  const handlePostDiary = () => {
    if (diaryEntry && selectedMood) {
      setPosts([...posts, { id: Date.now(), content: diaryEntry, mood: selectedMood, resonates: 0 }]);
      setDiaryEntry('');
      setSelectedMood('');
    }
  };

  const handleResonate = (id) => {
    setPosts(posts.map(post => post.id === id ? { ...post, resonates: post.resonates + 1 } : post));
  };

  const handleTaskComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: true } : task));
  };

  if (parentMode) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-purple-800">{window.translations[lang].parentGuardianMode}</h1>
        <p className="mt-4 text-gray-700">{window.translations[lang].usageTime}</p>
        <p className="text-gray-700">{window.translations[lang].moodTrend}</p>
        <button className="btn mt-4" onClick={() => setParentMode(false)}>
          {window.translations[lang].switchToTeenMode}
        </button>
        <div className="language-toggle mt-4">
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="bg-white text-gray-800 rounded-lg p-2"
          >
            {Object.keys(window.languages).map((key) => (
              <option key={key} value={key}>
                {window.languages[key]}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      {/* Header */}
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-purple-800">{window.translations[lang].appTitle}</h1>
        <div className="flex items-center space-x-4">
          <button className="btn" onClick={() => setParentMode(true)}>
            {window.translations[lang].parentMode}
          </button>
          <div className="language-toggle">
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-white text-gray-800 rounded-lg p-2"
            >
              {Object.keys(window.languages).map((key) => (
                <option key={key} value={key}>
                  {window.languages[key]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* Virtual Avatar Space */}
      <section className="card p-6">
        <h2 className="text-xl font-semibold text-purple-700">{window.translations[lang].yourVibeSpace}</h2>
        <div className="flex items-center space-x-4 mt-4">
          <img src="https://via.placeholder.com/100" alt="Avatar" className="avatar" />
          <div>
            <p className="text-gray-800">Your Room: <span className="text-purple-600">Star Galaxy</span></p>
            <p className="text-gray-600">Interests: Art, Music, Coding</p>
          </div>
        </div>
        <p className="mt-2 text-gray-600">Visitor Message: "Love your vibe!" - Alex</p>
      </section>

      {/* Anonymous Diary */}
      <section className="card p-6">
        <h2 className="text-xl font-semibold text-purple-700">{window.translations[lang].emotionsDiary}</h2>
        <div className="flex space-x-2 mt-4">
          {moods.map(mood => (
            <span
              key={mood}
              className={`mood-emoji ${selectedMood === mood ? 'scale-125' : ''}`}
              onClick={() => setSelectedMood(mood)}
            >
              {mood}
            </span>
          ))}
        </div>
        <textarea
          className="w-full mt-4 p-2 border rounded-lg"
          placeholder={window.translations[lang].shareFeelings}
          value={diaryEntry}
          onChange={(e) => setDiaryEntry(e.target.value)}
        />
        <button className="btn mt-4" onClick={handlePostDiary}>
          {window.translations[lang].postAnonymously}
        </button>
        <div className="mt-6 space-y-4">
          {posts.map(post => (
            <div key={post.id} className="p-4 bg-purple-50 rounded-lg">
              <p className="text-gray-800">{post.mood} {post.content}</p>
              <button
                className="text-purple-600 mt-2"
                onClick={() => handleResonate(post.id)}
              >
                {window.translations[lang].cheer} ({post.resonates})
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Gamified Tasks */}
      <section className="card p-6">
        <h2 className="text-xl font-semibold text-purple-700">{window.translations[lang].vibeChallenges}</h2>
        <div className="mt-4 space-y-4">
          {tasks.map(task => (
            <div key={task.id} className="flex justify-between items-center p-4 bg-pink-50 rounded-lg">
              <p className={task.completed ? 'line-through text-gray-500' : 'text-gray-800'}>
                {task.title} ({task.points} points)
              </p>
              {!task.completed && (
                <button className="btn" onClick={() => handleTaskComplete(task.id)}>
                  {window.translations[lang].checkIn}
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* School Feed */}
      <section className="card p-6">
        <h2 className="text-xl font-semibold text-purple-700">{window.translations[lang].schoolVibe}</h2>
        <p className="mt-4 text-gray-600">{window.translations[lang].verifiedSchool}</p>
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-gray-800">{window.translations[lang].studyGroup}</p>
          <button className="text-purple-600 mt-2">
            {window.translations[lang].cheer} (12)
          </button>
        </div>
      </section>

      {/* Offline Meetup Prompt */}
      <section className="card p-6">
        <h2 className="text-xl font-semibold text-purple-700">{window.translations[lang].realWorldVibesTitle}</h2>
        <p className="mt-4 text-gray-800">{window.translations[lang].meetupTask}</p>
        <button className="btn mt-4">{window.translations[lang].checkIn}</button>
      </section>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));