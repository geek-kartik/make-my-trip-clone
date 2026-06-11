from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "MakeMyTrip Clone API"
    environment: str = Field(default="local", validation_alias="APP_ENV")
    api_v1_prefix: str = "/api/v1"
    database_url: str = Field(
        default="mysql+pymysql://mmt_user:mmt_password@127.0.0.1:3306/makemytrip_clone",
        validation_alias="DATABASE_URL",
    )
    database_echo: bool = Field(default=False, validation_alias="DATABASE_ECHO")
    cors_origins: list[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()
