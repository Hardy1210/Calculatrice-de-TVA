'use client'
import { cn } from '@/lib/utils'
import { ChevronsLeftRightEllipsis, Copy } from 'lucide-react'
import { useState } from 'react'
import { Section } from '../app/components/section/Section'
import style from './page.module.scss'

export default function Home() {
  // etat pour les valeur HT y TTC
  //ht et ttc comment strign pour gerer la validation
  const [htValue, setHtValue] = useState<string>('')
  const [ttcValue, setTtcValue] = useState<string>('')
  //eta pour la tva selectionee
  const [selectedTvaRate, setSelectedTvaRate] = useState<number | null>(null)

  //eta pour la cantite de TVA
  const [tvaAmount, setTvaAmount] = useState<number | null>(null)

  //funtion pour gerer les changement de HT et valider juste les nombres
  const handleHtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (/^\d*\.?\d*$/.test(value)) {
      // nombres y el punto decimal
      setHtValue(value) //actualizer le valeur string
      if (value !== '' && selectedTvaRate !== null) {
        const ht = parseFloat(value)
        const ttc = ht + (ht * selectedTvaRate) / 100
        setTtcValue(ttc.toFixed(2)) //calcule deu  valeur cmment string
        setTvaAmount((ttc - ht).toFixed(2) as unknown as number) //calcule de la TVA
      } else {
        setTtcValue('')
        setTvaAmount(null)
      }
    }
  }

  //degale maniere une funtion pour gere les changements du TTC et valider juste de nombres
  const handleTtcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (/^\d*\.?\d*$/.test(value)) {
      //
      setTtcValue(value) // actulaizer lvaleur comment string
      if (value !== '' && selectedTvaRate !== null) {
        const ttc = parseFloat(value)
        const ht = ttc / (1 + selectedTvaRate / 100)
        setHtValue(ht.toFixed(2))
        setTvaAmount((ttc - ht).toFixed(2) as unknown as number) //calcule de la TVA
      } else {
        setHtValue('')
        setTvaAmount(null)
      }
    }
  }

  //funtion pour gerer les changements de pourcentage TVA
  const handleTvaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rate = parseFloat(e.target.value)
    setSelectedTvaRate(rate) //actualisation du porcentage du tva

    // Recalcula HT, TTC y TVA si ya hay valores en HT o TTC
    if (htValue !== '') {
      const ht = parseFloat(htValue)
      const ttc = ht + (ht * rate) / 100
      setTtcValue(ttc.toFixed(2))
      setTvaAmount((ttc - ht).toFixed(2) as unknown as number)
    } else if (ttcValue !== '') {
      const ttc = parseFloat(ttcValue)
      const ht = ttc / (1 + rate / 100)
      setHtValue(ht.toFixed(2))
      setTvaAmount((ttc - ht).toFixed(2) as unknown as number)
    }
  }

  return (
    <>
      <main className={cn(style.main, 'mt-10')}>
        <Section
          className={cn(style.section, 'px-5 border rounded-md py-5 shadow-md')}
        >
          <h1 className="text-center text-2xl mb-10" id="tva-calculator">
            Calculateur TVA
          </h1>
          <form aria-labelledby="tva-calculator" className="">
            {/* Inputs HT y TTC */}
            <fieldset
              className={cn(
                style.montant,
                ' flex flex-row text-xs md:text-sm  w-full gap-4 justify-center',
              )}
            >
              <div className="flex flex-col w-full  md:w-56">
                <label htmlFor="HT" className="">
                  Hors taxe - HT
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="HT"
                    value={htValue}
                    onChange={handleHtChange}
                    placeholder="Montant HT"
                    className="w-full h-11 border border-neutral-400/50 rounded-sm text-right"
                  />
                  <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText(htValue)}
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 "
                    aria-label="Copier le montant HT"
                  >
                    <Copy size={20} />
                  </button>
                </div>
              </div>
              <div className="mt-3 text-primary">
                <ChevronsLeftRightEllipsis size={50} strokeWidth={3} />
              </div>
              <div className="flex flex-col  w-full md:w-56">
                <label htmlFor="TTC">Taxes comprises - TTC</label>
                <div className="relative">
                  <input
                    type="text"
                    id="TTC"
                    value={ttcValue}
                    onChange={handleTtcChange}
                    placeholder="Montant TTC"
                    className="w-full h-11 border border-neutral-400/50 rounded-sm text-right"
                  />
                  <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText(ttcValue)}
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 "
                    aria-label="Copier le montant TTC"
                  >
                    <Copy size={20} />
                  </button>
                </div>
              </div>
            </fieldset>

            {/* choix de TVA */}
            <fieldset className="w-full mt-7 flex flex-col items-center">
              <legend className="text-center">
                Métropole (France continentale)
              </legend>
              <div className={cn(style.metropole, 'flex flex-row gap-6 mt-3')}>
                <div>
                  <input
                    type="radio"
                    id="tva-20"
                    name="taux-tva"
                    value="20"
                    onChange={handleTvaChange}
                  />
                  <label htmlFor="tva-20" className={cn(style.radio, 'ml-2')}>
                    20%
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="tva-10"
                    name="taux-tva"
                    value="10"
                    onChange={handleTvaChange}
                  />
                  <label htmlFor="tva-10" className={cn(style.radio, 'ml-2')}>
                    10%
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="tva-8.5"
                    name="taux-tva"
                    value="8.5"
                    onChange={handleTvaChange}
                  />
                  <label htmlFor="tva-10" className={cn(style.radio, 'ml-2')}>
                    8.5%
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="tva-5.5"
                    name="taux-tva"
                    value="5.5"
                    onChange={handleTvaChange}
                  />
                  <label htmlFor="tva-5.5" className={cn(style.radio, 'ml-2')}>
                    5.5%
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="tva-2.1"
                    name="taux-tva"
                    value="2.1"
                    onChange={handleTvaChange}
                  />
                  <label htmlFor="tva-2.1" className={cn(style.radio, 'ml-2')}>
                    2.1%
                  </label>
                </div>
              </div>
            </fieldset>
          </form>

          {/* Muestra la cantidad de TVA */}
          <div className="flex flex-col mt-7 items-center">
            <h2>Montant de la TVA</h2>
            <div className="flex">
              <p>
                <span
                  aria-live="polite"
                  className={cn('text-3xl mr-1', {
                    'text-primary': tvaAmount !== null,
                    foreground: !(tvaAmount !== null),
                  })}
                >
                  {tvaAmount !== null ? tvaAmount : '0.00'}
                </span>
                €
              </p>
              <button
                type="button"
                onClick={() =>
                  navigator.clipboard.writeText(tvaAmount?.toString() || '0.00')
                }
                className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label="Copier le montant de la TVA"
              >
                <Copy size={25} />
              </button>
            </div>
          </div>
        </Section>
      </main>
    </>
  )
}
