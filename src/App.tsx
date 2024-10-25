import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BlockView from './BlockView'
import PyramidView from './PyramidView'

const tabs = [
    { value: "pyramid", label: "Pyramid", component: <PyramidView /> },
    { value: "block", label: "Blocks", component: <BlockView /> }
];

function App() {
    return (
        <Tabs defaultValue="pyramid" className="relative w-screen">
            <TabsList className="fixed z-10 top-0 left-0">
                {tabs.map(tab => (
                    <TabsTrigger key={tab.value} value={tab.value}>
                        {tab.label}
                    </TabsTrigger>
                ))}
            </TabsList>
            {tabs.map(tab => (
                <TabsContent key={tab.value} value={tab.value}>
                    {tab.component}
                </TabsContent>
            ))}
        </Tabs>
    )
}

export default App