import { useState, useEffect } from 'react'

function App() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        // '/api/data' Nginx üzerinden arka plandaki C# container'ına yönlendirilir (Reverse Proxy)
        fetch('/api/data')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Veri çekilirken bir hata oluştu: ' + response.statusText)
                }
                return response.json()
            })
            .then(data => {
                setData(data)
                setLoading(false)
            })
            .catch(error => {
                console.error('API Hatası:', error)
                setError(error.message)
                setLoading(false)
            })
    }, [])

    return (
        <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: '800px', margin: '40px auto', padding: '0 20px', color: '#333' }}>
            <div style={{ background: '#ffffff', padding: '30px', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
                <h1 style={{ color: '#0d6efd', marginTop: 0, borderBottom: '2px solid #e9ecef', paddingBottom: '15px' }}>
                    🚢 React + C# Docker Test Uygulaması
                </h1>

                <p style={{ fontSize: '1.1rem', color: '#6c757d', lineHeight: '1.6' }}>
                    Bu sayfa basit bir <strong>React</strong> arayüzüdür. Aşağıdaki liste ise arka planda çalışan <strong>C# (.NET 8)</strong> API'sinden çekilen canlı verilerdir.
                    Eğer bu verileri görüyorsan, Docker container'ların Ubuntu üzerinde kendi aralarında başarılı bir şekilde iletişim kuruyor demektir! 🎉
                </p>

                <div style={{ marginTop: '30px' }}>
                    {loading && <p style={{ color: '#0dcaf0', fontWeight: 'bold', fontSize: '1.1rem' }}>⏳ C#'tan veriler yükleniyor, lütfen bekleyin...</p>}
                    {error && <p style={{ color: '#dc3545', fontWeight: 'bold', fontSize: '1.1rem' }}>❌ Hata: {error}</p>}

                    {!loading && !error && (
                        <div style={{ display: 'grid', gap: '15px' }}>
                            {data.map((item) => (
                                <div key={item.id} style={{
                                    background: '#f8f9fa',
                                    padding: '15px 20px',
                                    borderRadius: '8px',
                                    borderLeft: '5px solid #198754',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <span style={{ fontWeight: '600', fontSize: '1.1rem', color: '#212529' }}>{item.name}</span>
                                    <span style={{ background: '#d1e7dd', color: '#0f5132', padding: '6px 14px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 'bold' }}>
                                        {item.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default App
