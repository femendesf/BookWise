import { MyBooks } from "./MyBooks";
import FragmentosDoHorror from '../../../../public/assets/fragmentosDoHorror.png'

import HistoriaExtraordinarias from '../../../../public/assets/historias-extraordinarias.svg'

import ViagemAoCentroDaTerra from '../../../../public/assets/viagem-ao-centro-da-terra.svg'

export function BookSearchResult(){

    const capaFragmentos = FragmentosDoHorror.src

    return(
        <div>
            <MyBooks
                title="Fragmentos do Horror"
                author="Junji Ito"
                img={capaFragmentos}
                rating={4}
                description="Ornare amet scelerisque eget sit in donec dui. Tempus eget porttitor hendrerit eros viverra. Sit eget ipsum purus morbi curabitur cras gravida adipiscing dictum. Dui duis ut auctor dolor et mattis ultrices. Convallis quis in tortor pretium hendrerit sed. Vel et nibh sodales blandit egestas a quis bibendum."
                index={1}
                dateLastReading="Hoje"
            />

            <MyBooks
                title="Histórias extraordinárias"
                author="Edgar Allan Poe"
                img={HistoriaExtraordinarias}
                rating={4}
                description="Facilisis massa turpis morbi et. Aliquet arcu tellus id erat a lobortis et consectetur. Sit sit urna turpis vulputate. Morbi et leo in elit vitae bibendum scelerisque congue. Eget neque elementum non consequat lacus metus. Amet enim rhoncus neque proin purus nisl eget diam tellus. Id pellentesque nibh pellentesque pharetra viverra donec diam."
                dateLastReading="3 dias"
                index={2}
            />

            <MyBooks
                title="Viagem ao Centro da Terra"
                author="Julio Verne"
                img={ViagemAoCentroDaTerra}
                rating={4}
                description="Facilisis massa turpis morbi et. Aliquet arcu tellus id erat a lobortis et consectetur. Sit sit urna turpis vulputate. Morbi et leo in elit vitae bibendum scelerisque congue. Eget neque elementum non consequat lacus metus. Amet enim rhoncus neque proin purus nisl eget diam tellus. Id pellentesque nibh pellentesque pharetra viverra donec diam."
                dateLastReading="1 mês"
                index={3}
            />
        
        </div>
    )
}