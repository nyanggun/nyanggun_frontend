import Header from './components/common/Header'
import Footer from './components/common/Footer'
import ChatbotButton from './components/common/ChatbotButton'
import './App.css'

function App() {

  return (
    
    <>
      <Header /> 
      <main style={{ minHeight: 'calc(100vh - 100px)', padding: '20px' }}>
          {/* 임시 콘텐츠: 푸터를 아래로 밀어내기 위해 min-height를 설정했습니다. */}
          <h1>웹페이지 콘텐츠 영역</h1>
          <p>푸터가 하단에 고정되었는지 확인해주세요.</p>
      </main>
       
      <Footer />
      <ChatbotButton />
    </>
  )
}

export default App
