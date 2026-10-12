import {Page} from "@playwright/test";
import {expect} from '@playwright/test';

enum WidgetPageSelectors {
    WRAPPER = '.sc-dino-typography-h > [class^=widget__]',
    WIDGET_BODY = '[class^=widgetWrapper] > [class^=widget__]',
    HEADER_TEXT = 'header h5',
    BUTTON_OPEN_WIDGET = '[data-test=openWidget]', // Дополнила название для ясности
    BUTTON_WRITE_TO_US = '[data-test=button_feedback_form]', // Более надежный локатор
    ARTICLE_POPULAR_TITLE = '[class^=popularTitle__]',
    ARTICLE_POPULAR_LIST = `${ARTICLE_POPULAR_TITLE} + ul[class^=articles__]`,
    ARTICLE_POPULAR_LIST_ITEM = `${ARTICLE_POPULAR_LIST} > li`,
    SEARCH_INPUT = '[class^=cinput-text-input__]',
    SEARCH_RESULTS_TITLE = '[class^=found__]',
    SEARCH_RESULTS_LIST = `${SEARCH_RESULTS_TITLE} > ul[class^=articles__]`,
    SEARCH_RESULTS_LIST_ITEM = `${SEARCH_RESULTS_LIST} > li`,
    ARTICLE_TITLE_TEXT = '[class^=title__]',
}

export class WidgetPage {
    static selector = WidgetPageSelectors;

    constructor(protected page: Page) {}

    wrapper() {
        return this.page.locator(WidgetPage.selector.WRAPPER);
    }

    async openWidget() {
        await this.wrapper().locator(WidgetPage.selector.BUTTON_OPEN_WIDGET).click();
    }

    async openArticleBySearchName(articleName: string) {
        await this.wrapper().locator(WidgetPage.selector.SEARCH_RESULTS_LIST_ITEM).filter({hasText: articleName}).click();
    }

    async getPopularArticles() {
        const articles = this.wrapper().locator(WidgetPage.selector.ARTICLE_POPULAR_LIST_ITEM);
        await expect(articles.first()).toBeVisible(); //Проверяем, что статьи отображаются
        return await articles.all();
    }

    async searchArticleByName(articleName: string) {
        await this.wrapper().locator(WidgetPage.selector.SEARCH_INPUT).fill(articleName);
    }

    async getSearchResultsNames() {
        const articles = this.wrapper().locator(WidgetPage.selector.SEARCH_RESULTS_LIST_ITEM);
        await expect(articles.first()).toBeVisible();
        return await articles.allTextContents();
    }

    async clickWriteToUs() {
        await this.wrapper().locator(WidgetPage.selector.BUTTON_WRITE_TO_US).click();
    }

    async getTitle() {
        return await this.wrapper().locator(WidgetPage.selector.HEADER_TEXT).textContent();
    }

    async getArticleTitle() {
        return await this.wrapper().locator(WidgetPage.selector.ARTICLE_TITLE_TEXT).textContent();
    }

    getWidgetBody() {
        return this.wrapper().locator(WidgetPage.selector.WIDGET_BODY);
    }
}

