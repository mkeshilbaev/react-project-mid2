import React, { Component, ComponentType } from "react";
import Loading from "./Loading";

interface Props {
    dataSource?: string;
}
interface State {
    results: any[];
    loading: boolean;
    preloader: boolean;
    error: string;
    page: number;
    api?: string;
}

const withDataFetching = (props: Props) => (
    WrappedComponent: ComponentType<State>
) => {
    class WithDataFetching extends Component<Props, State> {
        constructor(props: Props) {
            super(props);
            this.state = {
                results: [],
                loading: true,
                preloader: true,
                error: "",
                page: 0,
                api: ''
            };
        }

        async fetchData() {
            if (props.dataSource) {
                this.setState({
                    api: props.dataSource,
                    loading: true
                });
                this.getList(props.dataSource)
                try {
                } catch (error) {
                    this.setState({
                        loading: false,
                        error: error.message,
                    });
                }
            }
        }

        async getList(api?: string) {
            console.log(api)
            const data = await fetch(api + '&offset=' + this.state.page);
            const json = await data.json();
            console.log(json)

            if (json) {
                this.setState({
                    results: this.state.page ? this.state.results.concat(json) : json,
                    loading: false,
                    preloader: false
                });
            }
        }

        async componentDidMount() {
            this.fetchData();
            window.onscroll = (e: any) => {
                let doc = document.scrollingElement
                if (doc)
                    if (!this.state.preloader && doc.scrollHeight - doc.clientHeight - doc.scrollTop <= 2000) {
                        this.setState({
                            page: this.state.page + 20,
                            preloader: true
                        });
                        this.getList(this.state.api)
                    }
            }
        }



        render() {
            const { results, loading, preloader, error, page } = this.state;

            if (loading || error) {
                return loading ? <Loading /> : error
            }

            return (
                <WrappedComponent
                    results={results}
                    loading={loading}
                    preloader={preloader}
                    error={error}
                    page={page}
                    {...this.props}
                />
            );
        }
    }

    return WithDataFetching;
};

export default withDataFetching;
